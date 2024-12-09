import React, { useState, useMemo} from "react";
import station_names from "../data/station/names.json"
import {RecentStationData} from './utils/station_data_format_util'
import RenderChart from './station_graph.js'
import { flip_coords } from "@/lib/storm_utils";

import { Marker, Popup } from "react-leaflet";

import { getDisplayName } from "./utils/station_data_format_util";
import styles from './station_marker.module.css'



/**
 * 
 * @param {[Object]} station_data Station Data object after being retrieved from WFS and processed. 
 * First element is station name, second element is a dictionary of station data. See readme for format
 * @param {Date} time Time of the station data to retrieve. Defaults to most recent data if not provided
 * @returns StationMarker JavaScript snippet
 */
export default function StationMarker(station_data, station_descriptions, time = new Date(), ) {
    if(isNaN(time))
      time= new Date()

    //Check if selected var contains any of the following
    //wind_speed, temperature, sea_surface_wave, air_pressure
    const [selectedVar, setSelectedVarCategory] = useState("wind_speed")
    
    const station_name = station_data[0]
    const station_values = station_data[1]
    const data_link = "https://cioosatlantic.ca/erddap/tabledap/" + station_name + ".html"
    const data_text = RecentStationData(station_values, time)

    // Change to call from ERDDAP
    const display_name = getDisplayName(station_descriptions, station_name);
    

    //const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name

    // Data for station doesn't exist at the provided time
    if(!data_text) return

    return (
      <Marker 
        key={station_name} 
        position={flip_coords(station_values.geometry.coordinates)}
        >
          <Popup > 
            <h4>{display_name}</h4>
            <div class={styles.button.divider} id="var_buttons">
              <button className={styles.button} id="station-button-wind" onClick={()=>setSelectedVarCategory("wind_speed")}>Wind</button>
              <button className={styles.button} id="station-button-temp" onClick={()=>setSelectedVarCategory("temperature")}>Temp</button>
              <button className={styles.button} id="station-button-wave" onClick={()=>setSelectedVarCategory("wave")}>Wave</button>
              <button className={styles.button} id="station-button-pressure" onClick={()=>setSelectedVarCategory("air_pressure")}>Pressure</button>
            </div>
            <div className="station_chart" 
            contentStyle={{
              width: 'auto', // Adjust width based on content (chart)
              padding: '20px', // Optional padding around chart
              }}>
                <RenderChart  
                sourceData={station_values?.properties?.station_data}
                stationName={station_name}
                varCategory={selectedVar}
                />
            </div>
            {selectedVar}
            {data_text}
            <a href={data_link} target="_blank">Full data</a>
          </Popup>
        </Marker>
    )
}