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
  //console.log(JSON.parse(chartData));
  let stationDataTable = {}; 


  const attributes_of_interest = ['sea_surface_wave_significant_height',
    'sea_surface_wave_maximum_height', "wind_speed_of_gust", "air_temperature", "time", "sea_surface_temperature", "wind_speed", "air_pressure"]

  // For each value in the dict
  Object.entries(fullStationData).forEach(([station_name, station_details]) => {
    //console.log(`Station_name: ${station_name}`);
    //console.log(`station_details: ${station_details.properties.station_data}`);
    const stationEntries= station_details.properties.station_data

    //const station_data = JSON.parse(stationEntries);


    const re_match = /(?<var_name>[\w_]+)\s\((?<standard_name>[\w_]+)\|(?<units>[\w\s\/()-]+)\|(?<long_name>[\w\s\d\/()]+)\)/g; 

 
    //let field_value = undefined;
    let field_obj = undefined;
        
    station_data.forEach((row) => {
    //console.log("Row:", row);

      Object.keys(row).forEach((field) => {
        //console.log(field)
        
        //field_value = row[field]
        //console.log(field);
        const names = [...field.matchAll(re_match)];
        if (names.length > 0) {
          field_obj = {};
          //console.log(names[0])

          field_obj.var_name = names[0].groups["var_name"];
          field_obj.std_name = names[0].groups["standard_name"];
          field_obj.units = names[0].groups["units"];
          field_obj.long_name = names[0].groups["long_name"];
          field_obj.value = row[field];}
          
          // See if attribute of interest includes std name
          if (attributes_of_interest.includes(field_obj.std_name)){
            if (!stationDataTable[station_name]) {
              stationDataTable[station_name] = { data: {} };}  // Initialize the station entry if not found
            
            const station = stationDataTable[station_name];
            // Check if the std_name field already exists in the station data
            if (!station.data[field_obj.std_name]) {
                // Create a new entry for this field
              station.data[field_obj.std_name] = field_obj;}
            else {
              // If the field already exists, append the value
              const existingField = station.data[field_obj.std_name];
          
              if (!Array.isArray(existingField.value)) {
                existingField.value = [existingField.value];}
              existingField.value.push(field_obj.value);};
      }});});
      });
    stationDataTable= dataConversion(stationDataTable);


    return stationDataTable 
}

function dataConversion(stationDataTable){
  Object.entries(stationDataTable).forEach(([stationName, stationData]) => {
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
  return stationDataTable

}
    