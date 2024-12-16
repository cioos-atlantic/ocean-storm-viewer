import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout"
import { RenderWindRose } from "./wind_rose";
import BasicTabs from "./tabs";
import { RecentStationData, getDisplayName } from "../utils/station_data_format_util";
import styles from '../station_marker.module.css'
import RenderChart from '../station_graph.js'
import { BlockquoteLeft } from "react-bootstrap-icons";

export default function StationDashboard({children, selected_station, setSelectedStation, station_descriptions, time, selectedStationVar, setSelectedStationVar}) {
  
    const stationData = selected_station
      
    console.log(stationData)
      //Check if selected var contains any of the following
      //wind_speed, temperature, sea_surface_wave, air_pressure
      const station_name = stationData[0]
      const station_values = stationData[1]
      console.log(stationData)
      const data_link = "https://cioosatlantic.ca/erddap/tabledap/" + station_name + ".html"
      const data_text = RecentStationData(station_values, time)
  
      if (!data_text) 
        return null
  
      // Change to call from ERDDAP
      const display_name = getDisplayName(station_descriptions, station_name);
  
      let wind_disabled = true;
      let temp_disabled = true;
      let wave_disabled = true;
      let pressure_disabled = true;
  
      const exclude_var = ['time', 'latitude', 'longitude','relative_humidity',
        'sea_surface_wave_from_direction', 'sea_surface_wave_maximum_period'
     ]
      const standardNames = station_values?.properties?.station_data?.column_std_names
      const variablePresence = {
        'wind_speed':false,
        'wind_from_direction':false,
        'temperature':false,
        'wave':false,
        'air_pressure':false
      }
      standardNames.forEach((varName) => {
        if(!exclude_var.includes(varName)){
          variablePresence['wind_speed'] = variablePresence['wind_speed'] ? true : varName.includes("wind_speed") ? true : false
          variablePresence['wind_from_direction'] = variablePresence['wind_from_direction'] ? true : varName.includes("wind_from_direction") ? true : false
          variablePresence['temperature'] = variablePresence['temperature'] ? true : varName.includes("temperature") ? true : false
          variablePresence['wave'] = variablePresence['wave'] ? true : varName.includes("wave") ? true : false
          variablePresence['air_pressure'] = variablePresence['air_pressure'] ? true : varName.includes("air_pressure") ? true : false
        }
      })
  
      //const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name
  
      // Data for station doesn't exist at the provided time

    return (
        <div key="01-station-dashboard" class="station_dashboard">
            <div className="dash-header">
                <button
                    class="close"
                    onClick={(e) => {
                        setSelectedStation(empty_station_obj)
                    }}
                ><FaWindowClose/></button>
                <h3>{display_name}</h3>
            </div>
            <div class="dash-body">
                <h4>{display_name}</h4>
                <p>
                    <BasicTabs  
                    stationData={station_values?.properties?.station_data}
                    variablePresence={variablePresence}
                    /> 
                </p>
                <div className={styles.button.divider} id="var_buttons">
                    <button className={styles.button} id="station-button-wind" 
                        disabled={wind_disabled} onClick={()=>setSelectedStationVar("wind_speed")}>Wind</button>
                    <button className={styles.button} id="station-button-temp" 
                        disabled={temp_disabled} onClick={()=>setSelectedStationVar("temperature")}>Temp</button>
                    <button className={styles.button} id="station-button-wave" 
                        disabled={wave_disabled} onClick={()=>setSelectedStationVar("wave")}>Wave</button>
                    <button className={styles.button} id="station-button-pressure" 
                        disabled={pressure_disabled} onClick={()=>setSelectedStationVar("air_pressure")}>Pressure</button>
                </div>
                <div className="station_chart" 
                style={{
                height: 'auto',
                width: 'auto', // Adjust width based on content (chart)
                padding: '20px', // Optional padding around chart
                }}>
                    <RenderChart  
                    sourceData={station_values?.properties?.station_data}
                    stationName={station_name}
                    varCategory={selectedStationVar}
                    />
                </div>
                {data_text}
            </div>
            <div class="dash-footer">
                <a href={data_link} target="_blank">Full data</a>
            </div>
        </div>
    )
}