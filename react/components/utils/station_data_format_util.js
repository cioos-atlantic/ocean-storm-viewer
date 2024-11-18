import { formatCioosStations } from "../station_formats";

//Takes from ['erddap_data]['features']
//Filter_station can be provided if you have the full feature data,
//but only want one station
export function station_data_format(features, filter_station) {
    try {
        let station_data = {}
        const re_match = /(?<var_name>.*)\s\((?<standard_name>.*)\|(?<units>.*)\|(?<long_name>.*)\)/g; 
        for (let feature in features){
            const station_name = features[feature]['properties']['station']
            // Can change the WFS query to only get one station, but for now easier to filter out here
            if(!filter_station || filter_station==station_name){
                const parsed_data = JSON.parse(features[feature]['properties']['station_data']);
                if(station_data[station_name]) {
                    //Theory that data is already sorted, but perhaps not so - it's not - all alphabetical
                    station_data[station_name]['properties']['max_time'] = features[feature]['properties']['max_time']
                }
                else {
                    station_data[station_name] = features[feature];
                    let station_data_formatted = {
                        'column_names':[],
                        'column_units':[],
                        'column_std_names':[],
                        'column_long_names':[],
                        'column_raw_names':[],
                        'rows':[]
                    };
                    const data_fields = Object.keys(parsed_data[0]);

                    data_fields.forEach((field) => {
                        const names = [...field.matchAll(re_match)];
                        if (names.length > 0) {
                            station_data_formatted['column_names'].push(names[0].groups["var_name"]);
                            station_data_formatted['column_std_names'].push(names[0].groups["standard_name"]);
                            station_data_formatted['column_units'].push(names[0].groups["units"]);
                            station_data_formatted['column_long_names'].push(names[0].groups["long_name"]);
                            station_data_formatted['column_raw_names'].push(field);
                        }
                    })
                    station_data[station_name]['properties']['station_data'] = station_data_formatted;
                }
                const station_column_data = station_data[station_name]['properties']['station_data']['column_raw_names']
                parsed_data.forEach((row) => {
                    let row_data = []
                    station_column_data.forEach((column) => {
                        row_data.push(row[column])
                    })
                    station_data[station_name]['properties']['station_data']['rows'].push(row_data)
                })
            }
        }
        return station_data
    } catch (err) {
        console.log("Error reformatting data")
        return err
    }
}

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
        do {position++} while (new Date(time_data[position]) < time && position < time_data.length - 1)
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
export function RecentStationData(data, time) {
    //let station_data = data['properties']['station_data']
    let station_data = data?.properties?.station_data;
    let children = []

    const row_position = get_recent_row_position(data,time)
    if(row_position < 0) return 
    formatCioosStations(station_data, children, row_position)
  
    let station_info = (
      <div className="station_pane">
        {children}
      </div>
    );
  
    //console.log(station_info)
    return station_info;
    
  }