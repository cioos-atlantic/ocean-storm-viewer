import { get_station_field_data,  getColumnNameList, getUniqueStdNamesList } from '../utils/station_data_format_util';

export const windSpeedBins = [
  { min: 0, max: 8, label: "=< 8 m/s" },
  { min: 8, max: 16, label: "9-16 m/s" },
  { min: 16, max: 24, label: "17-24 m/s" },
  { min: 24, max: 32, label: "25-32 m/s" },
  { min: 32, max: 40, label: "33-40 m/s" },
  { min: 40, max: 48, label: "41-48 m/s" },
  { min: 48, max: 56, label: "49-56 m/s" },
  { min: 56, max: 64, label: "57-64 m/s" },
  { min: 64, max: undefined, label: ">= 65 m/s" },

];
export const colorPalette= [
  '#5E4FA2', // Deep Purple
'#3288BD', // Blue
'#66C2A5', // Teal
'#ABDDA4', // Light Green
'#E6F598', // Yellow-Green
'#FEE08B', // Yellow
'#FDAE61', // Orange
'#F46D43', // Red-Orange
'#D53E4F', // Deep Red
];

export const cardinalPoints = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];



/**
 * The function categorizeWindDirection converts a wind direction angle into a cardinal direction
  * @returns The function `categorizeWindDirection` takes a numerical direction value and categorizes it
 * into one of the cardinal wind directions (e.g., N, NE, E, etc.). The function calculates the index
 * of the corresponding cardinal direction based on the input direction value and returns the cardinal
 * direction as a string.
 */
export function categorizeWindDirection(direction) {
  const cardinalPoints = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const sectors = 360 / cardinalPoints.length;
  const index = Math.round(direction / sectors) % cardinalPoints.length;
  return cardinalPoints[index];
}

/**
 * The function categorizeWindSpeed(speed) categorizes wind speeds into predefined bins and returns the
 * corresponding label.
 
 * @returns The function `categorizeWindSpeed` returns the label of the wind speed bin that the input
 * speed falls into. If the input speed does not match any bin, it returns "Unknown".
 */
export function categorizeWindSpeed(speed) {
  for (const bin of windSpeedBins) {
    if (speed >= bin.min && (bin.max === undefined || speed < bin.max)) {
      return bin.label; // Return the label instead of the index
    }
  }
  return "Unknown"; // For speeds that don't match any bin
}



/**
 * The function `makeEmptyfreqObj` creates an empty frequency object with cardinal points as keys and
 * arrays of zeros as values.
 * @returns The function `makeEmptyfreqObj` is returning an object `freqObj` that has keys representing
 * cardinal points and values as arrays filled with zeros based on the length of the `windSpeedBins`
 * array.
 */
export function makeEmptyfreqObj(windSpeedBins, cardinalPoints){
  const freqObj =  {};
  cardinalPoints.forEach((point)=>{
    freqObj[point] = new Array(windSpeedBins.length).fill(0);});
  
  console.log(freqObj);

  return freqObj
  
}

/**
 * The function `makeFreqFraction` calculates the frequency fraction of each data point in a given object based on the total number of data points.
 * @returns The function `makeFreqFraction` returns a modified version of the `freqObj` object where
 * each value has been converted to a frequency fraction based on the `totalDataPoints`. The values in
 * the object have been transformed to represent the percentage of the total data points that they
 * account for.
 */
export function makeFreqFraction(freqObj, totalDataPoints){
  console.log(totalDataPoints)
  const freqFrac= structuredClone(freqObj);

  Object.values(freqFrac).forEach((point) =>{
    //console.log(point)


    point.forEach((value, index) => {
      
      point[index] = (value / totalDataPoints) * 100

    });
  });

  //console.log(freqFrac);
  return freqFrac
};

/**
 * The function `extractWindSpeedBins` extracts and returns an array of wind speed labels from a given a set of wind speed bins.

 */
export function extractWindSpeedBins(){
  const windSpdLabel= []
    
    windSpeedBins.forEach((obj) =>
      {windSpdLabel.push(obj.label)})

    return windSpdLabel
};

/**
 * The function `makeGroupedList` takes arrays of wind directions and speeds, categorizes them, and
 * returns a list of objects with wind speed, speed bin, direction, and cardinal direction.
 
 */
export function makeGroupedList(directions, speeds){
    const groupedList = [];
    directions.forEach((direction, index) => {
    
        const cardinal = categorizeWindDirection(direction);
        //console.log(cardinal)
        const speedBin = categorizeWindSpeed(speeds[index]);
    
        groupedList.push({
          windSpeed : speeds[index],
          speedBin : speedBin,
          direction : direction,
          cardinal : cardinal,
        });
      });

    return groupedList

}

/**
 * The function `processWindSpeeds` processes wind speed data from a source and stores it in an object with unique keys like "wind_speed_1", "wind_speed_2",
 * etc.
 */
export function processWindSpeeds(sourceData){
    const include_var = [ "wind_speed"]
    // Initialize the result object
    const windSpeed = {};
    const  column_names = sourceData.column_names;
  
    const column_std_names = sourceData.column_std_names;
    const uniqueColStdNames= getUniqueStdNamesList(column_std_names);
    console.log(uniqueColStdNames);
  
    uniqueColStdNames.filter((variable) => include_var.includes(variable))
    .forEach((variable, index) => {
      const column_names_list = getColumnNameList(column_std_names, column_names, variable)


      column_names_list.forEach(col_name => {
        const station_data_obj = get_station_field_data(sourceData, col_name)
        const values = station_data_obj.data;
        const long_name= station_data_obj.long_name;
    
        // Store each instance of wind_speed with a unique name like "wind_speed_1", "wind_speed_2", etc.
        windSpeed[long_name] = values;
      });
  
    });
  
    return windSpeed;
  }
  
/**
 * The function `parseWindData` takes frequency fraction data and wind speed labels, and organizes them
 * into an array of objects with direction, value, and wind speed bin properties.

 * @returns The `parseWindData` function returns an array of objects containing wind data. Each object
 * in the array has the properties `direction`, `value`, and `windSpeedBin`. The `direction` property
 * corresponds to the key from the `freqFrac` object, the `value` property corresponds to the value at
 * a specific index in the points array, and the `windSpeedBin` property
 */
export function parseWindData(freqFrac, windSpdLabel){
    const data = [];
    Object.entries(freqFrac).forEach(([key, points]) => {

        points.forEach((value, index)=> {
            data.push(
                {
                direction: key,
                    value: value,
                    windSpeedBin: windSpdLabel[index]
                }
            )
        })
    });
    //console.log(data)
    return data;

}
