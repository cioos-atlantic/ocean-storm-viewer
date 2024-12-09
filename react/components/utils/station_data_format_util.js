import { formatCioosStations } from "../station_formats";
import RenderChart from '../station_graph.js'

//Station data should be formatted from station_data_format util
//Takes input from the station_data list field, not the whole station data itself
export function get_station_field_data(station_data, field_name, name_type='column_names'){
    const arrayColumn = (arr, n) => arr.map(x => x[n]);
    const field_position = get_station_field_position(station_data,field_name,name_type)
    const field_data = arrayColumn(station_data['rows'], field_position)
    return field_data
}

export function get_recent_row_position(station_info, time){
    //const station_data = station_info['properties']['station_data']
    const station_data = station_info?.properties?.station_data;

    let position = -1 // Errors out if not set
    //const max_time = Date.parse(station_info['properties']['max_time'])
    //const min_time = Date.parse(station_info['properties']['min_time'])
    const max_time = Date.parse(station_info?.properties?.max_time)
    const min_time = Date.parse(station_info?.properties?.min_time)
    //No time provided or is more recent than the max time, get most recent data
    if(!time || time >= max_time){
        position = station_data['rows'].length - 1
    }
    //Time provided and within bounds
    else if(time <= max_time && time >= min_time){
        //Get all data from the time column
        const time_data = get_station_field_data(station_data, 'time', 'column_std_names')
        do {position++} while (new Date(time_data[position]) < time && position < (time_data.length - 1))
    }
    // Other case, time provided but out of bounds, returns initialization error (-1)
    return position
}

// Provides the unit type of a field given a field name
export function get_station_field_units(station_data, field_name, name_type='column_names'){
    const field_position = get_station_field_position(station_data,field_name,name_type)
    return station_data['column_units'][field_position]
}

// Provides the column position of a field given the field name
export function get_station_field_position(station_data, field_name, name_type='column_names'){
    const field_position = station_data[name_type].indexOf(field_name)
    return field_position
}


// Given station data and a row position, gets the value in the given column name
export function get_station_data_value(station_data, row_position, column_name, name_type="column_names"){  
    if(!station_data[row_position]) return null
    const col_index = get_station_field_position(station_data, column_name, name_type="column_names")
    return col_index > -1 ? station_data[row_position][col_index] : null
}
  
// Returns the most recent row of data for a station
// If provided a time (as JS timestamp), it will return the 
// most recent row from the data before that time

// state can select a standard variable?
export function RecentStationData(data, time) {
    let station_data = data?.properties?.station_data;

    const row_position = get_recent_row_position(data,time)
    if(row_position < 0) return 
    let children = []
    formatCioosStations(station_data, children, row_position)
  
    let station_info = (
      <div className="station_pane">
        {children}
      </div>
    );
  
    return station_info;
    
  }

export function getDisplayName(station_descriptions, station_name){
    let display_name;

    const matchedDataset = station_descriptions?.find(station_description => station_description.id === station_name);
    
    if (matchedDataset) {
      display_name = matchedDataset.title;
      console.log(`Match found! Dataset title is: ${display_name}`);
    } else {
      console.log("No match found.");
      display_name = station_name
    }
    return display_name;
}