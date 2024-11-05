import {windSpeedToKnots, windSpeedToKmh, tempToDegreeF, tempToDegreeC, pressureToKPa, pressureToInHg, windHeightToM, windHeightToFt} from './utils/unit_conversion.js'
import Image from "next/image";
//TODO: Clean up


export function formatCioosStations(data_obj, children, row_position){
  // Get the data value in the specified column in the object's row
  let data_value = (column_name) => {
    if(!row_data[row_position]) return null
    const col_index = column_data.indexOf(column_name)
    return col_index > -1 ? row_data[row_position][col_index] : null
  }

  // Conversion handling, but just in case
  let column_units = (column_name) => {
    const col_index = column_data.indexOf(column_name)
    return col_index > -1 ? unit_data[col_index] : null
  }

  const column_data = data_obj['column_std_names']
  const unit_data = data_obj['column_units']
  const row_data = data_obj['rows']

  // Separate section for wind since the arrows need to be drawn
  //Possible to do this in a loop?

  const datetime = data_value('time')
  children.push(<strong>{formatCioosDateTime(datetime)}</strong>)
  children.push(<br></br>)
  children.push(<br></br>)

  const wind_from_direction = data_value('wind_from_direction')
  if(wind_from_direction){
    const wind_direction = (180 + parseInt(wind_from_direction)) % 360
    children.push(<strong>Wind:  </strong>)
    children.push(<Image class="wind_arrow" alt={wind_direction} src="arrow.svg" height={20} width={20} 
      style={{ transform: 'rotate(' + (wind_direction) + 'deg)' }}></Image>)
  }
  
  const wind_speed = data_value('wind_speed')
  if(wind_speed){
    wind_from_direction ? null : children.push(<strong>Wind:  </strong>)
    const resultKmh = windSpeedToKmh(wind_speed)
    const resultKnots = windSpeedToKnots(wind_speed)
    children.push(<span>    {resultKnots.value} {resultKnots.unit} ({resultKmh.value} {resultKmh.unit})</span>)}
  
  const air_temperature = data_value('air_temperature')
  if(air_temperature){
    const resultDegreeF = tempToDegreeF(air_temperature)
    //Should already be in Celsius may not need? Maybe good for formatting though
    const resultDegreeC = tempToDegreeC(air_temperature)
    children.push(<p><strong>Temperature (Air):</strong> {resultDegreeC.value} {resultDegreeC.unit}   ({resultDegreeF.value} {resultDegreeF.unit})</p>)}

  const sea_surface_temperature = data_value('sea_surface_temperature')
  if(sea_surface_temperature){
    //console.log(data_obj['wind_speed']);
    const resultDegreeF = tempToDegreeF(sea_surface_temperature)
    const resultDegreeC = tempToDegreeC(sea_surface_temperature)
    children.push(<p><strong>Temperature (Sea Surface):</strong> {resultDegreeC.value} {resultDegreeC.unit} ({resultDegreeF.value} {resultDegreeF.unit})</p>)}

  const relative_humidity = data_value('relative_humidity')
  if(data_obj['relative_humidity']){
    children.push(<p><strong>Humidity:</strong> {parseInt(relative_humidity)}%</p>)}

  const air_pressure = data_value('air_pressure')
  if(air_pressure){
    //console.log(data_obj['wind_speed']);
    const resultKPa = pressureToKPa(air_pressure)
    const resultInHg = pressureToInHg(air_pressure)
    children.push(<p><strong>Air Pressure:</strong> {resultKPa.value} {resultKPa.unit} ({resultInHg.value} {resultInHg.unit})</p>)}

  const sea_surface_wave_maximum_height = data_value('sea_surface_wave_maximum_height')
  if(sea_surface_wave_maximum_height){
    //console.log(data_obj['wind_speed']);
    const resultM = windHeightToM(sea_surface_wave_maximum_height)
    const resultFt = windHeightToFt(sea_surface_wave_maximum_height)
    children.push(<p><strong>Wave Height (Max):</strong> {resultM.value} {resultM.unit} ({resultFt.value} {resultFt.unit})</p>)}

  const sea_surface_wave_significant_height = data_value('sea_surface_wave_significant_height')
  if(sea_surface_wave_significant_height){
    //console.log(data_obj['wind_speed']);
    const resultM = windHeightToM(sea_surface_wave_significant_height)
    const resultFt = windHeightToFt(sea_surface_wave_significant_height)
    children.push(<p><strong>Wave Height (Avg):</strong> {resultM.value} {resultM.unit} ({resultFt.value} {resultFt.unit})</p>)}
}

export function formatCioosDateTime(date_str){
  const date = new Date(date_str * 1);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
};

  const timestamp = date.toLocaleString('en-US', options);
  return timestamp
}


export function parseData(fullStationData) {
  console.log(fullStationData);
  //console.log(JSON.parse(chartData));
  let stationDataTable = {}; 

  Object.entries(fullStationData).forEach(([station_name, station_details]) => {
    //console.log(`Station_name: ${station_name}`);
    //console.log(`station_details: ${station_details.properties.station_data}`);
    const stationBbox = station_details.bbox;
    //console.log(stationBbox)
    const stationEntries= station_details.properties.station_data;
    //console.log(stationEntries);
    if (!stationDataTable[station_name]) {
      stationDataTable[station_name] = { 
        bbox: stationBbox,
        data: {} };}  // Initialize the station entry if not found


    const station_data = stationDataTable[station_name].data;

    stationEntries.column_std_names.forEach((variable) =>{

      let index = stationEntries.column_std_names.indexOf(variable);
      station_data[variable]= {
        column_long_names: stationEntries.column_long_names[index],
        column_std_names: stationEntries.column_std_names[index],
        column_names: stationEntries.column_names[index],
        column_units: stationEntries.column_units[index],
        value:[]

      };


      stationEntries.rows.forEach((list) =>{
        station_data[variable].value.push(list[index])
      });
    })

    console.log(stationDataTable);

  
  });
  console.log(stationDataTable);
  const convertedStationData= dataConversion(stationDataTable);

  
  return convertedStationData 
}

function dataConversion(stationDataTable){
  let rawStationData = { ...stationDataTable }; // make deep copy

  //console.log(stationDataTable);
  Object.entries(rawStationData).forEach(([stationName, stationData]) => {
    const station = stationData.data
    Object.entries(station).forEach(([key, variable]) => {
      if (!Array.isArray(variable.value)) {
        variable.value= [variable.value]}

      if (key === 'air_pressure'){
        variable.units = 'kPa';
        variable.value = variable.value.map(v => {
          const resultKPa = pressureToKPa(v);
          //console.log(`Value: ${v}, Converted: ${resultKPa.value}`);
          return resultKPa.value}); 
      }
      if (key === 'wind_speed'){
        variable.units = 'Kmh';
        variable.value = variable.value.map(v => {
          const resultKmh = windSpeedToKmh(v);
          //console.log(`Value: ${v}, Converted: ${resultKmh.value}`);
          return resultKmh.value}); 
      }

      if (key === 'wind_speed_of_gust'){
        variable.units = 'Kmh';
        variable.value = variable.value.map(v => {
          const resultKmh = windSpeedToKmh(v);
          //console.log(`Value: ${v}, Converted: ${resultKmh.value}`);
          return resultKmh.value}); 
      }
      
      
      //console.log(station)
    })

  })
  console.log(rawStationData);
  return rawStationData

}
export function getStormBbox (storm_data){
  const bbox = storm_data["pts"]["features"]['0'].bbox;
  console.log(bbox);
  return bbox;;

}
    
function filter_stations(stationData){
  const attributes_of_interest = ['sea_surface_wave_significant_height',
    'sea_surface_wave_maximum_height', "wind_speed_of_gust", "air_temperature", "time", "sea_surface_temperature", "wind_speed", "air_pressure"];
}