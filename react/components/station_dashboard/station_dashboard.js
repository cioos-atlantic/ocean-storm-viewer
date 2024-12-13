import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout"
import { RecentStationData, getDisplayName } from "../utils/station_data_format_util";
import styles from '../station_marker.module.css'
import RenderChart from '../station_graph.js'
import { BlockquoteLeft } from "react-bootstrap-icons";

export default function StationDashboard({children, selected_station, setSelectedStation, station_descriptions, time, selectedStationVar, setSelectedStationVar}) {
  
    const station_data = selected_station
      
    console.log(station_data)
      //Check if selected var contains any of the following
      //wind_speed, temperature, sea_surface_wave, air_pressure
      const station_name = station_data[0]
      const station_values = station_data[1]
      const data_link = "https://cioosatlantic.ca/erddap/tabledap/" + station_name + ".html"
      console.log(time)
      const data_text = RecentStationData(station_values, time)
  
      if (!data_text) 
        return null
  
      // Change to call from ERDDAP
      const display_name = getDisplayName(station_descriptions, station_name);
  
      let wind_disabled = true;
      let temp_disabled = true;
      let wave_disabled = true;
      let pressure_disabled = true;
  
      const exclude_var = ['time', 'latitude', 'longitude', 'wind_from_direction', 'relative_humidity',
        'sea_surface_wave_from_direction', 'sea_surface_wave_maximum_period'
     ]
      const standardNames = station_values?.properties?.station_data?.column_std_names
      standardNames.forEach((varName) => {
        if(!exclude_var.includes(varName)){
          wind_disabled = varName.includes("wind_speed") ? false : wind_disabled ? true : false
          temp_disabled = varName.includes("temperature") ? false : temp_disabled ? true : false
          wave_disabled = varName.includes("wave") ? false : wave_disabled ? true : false
          pressure_disabled = varName.includes("air_pressure") ? false : pressure_disabled ? true : false
        }
      })
      
  
      //const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name
  
      // Data for station doesn't exist at the provided time

    return (
        <div key="01-station-dashboard" class="station_dashboard" contentstyle={{
            maxHeight: '20px'
            }}>
            <div class="dash-header">
                <button
                    class="close"
                    onClick={(e) => {
                        setSelectedStation(empty_station_obj)
                    }}
                ><FaWindowClose/></button>
                <h3>{station_data[0]}</h3>
            </div>
            <div class="dash-body" contentstyle={{
            maxHeight: '200px'
            }}>
                <h4>{display_name}</h4>
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