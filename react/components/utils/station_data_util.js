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
    const station_data = station_info['properties']['station_data']
    let position = -1 // Errors out if not set
    //No time provided, get most recent data
    if(!time){
        position = station_data['rows'].length - 1
    }
    //Time provided and within bounds (historical)
    else if(time <= station_info['properties']['max_time'] && time >= station_info['properties']['min_time']){
        //Worry about this later
    }
    // Other case, time provided but out of bounds, returns initialization error
    return position
}

export function get_station_field_units(station_data, field_name, name_type='column_names'){
    const field_position = get_station_field_position(station_data,field_name,name_type)
    return station_data['column_units'][field_position]
}

export function get_station_field_position(station_data, field_name, name_type='column_names'){
    const field_position = station_data[name_type].indexOf(field_name)
    return field_position
}

//Gets the most recent station data before a given time, if no time given, most recent data
export function get_station_row_data(station_info, time){
}