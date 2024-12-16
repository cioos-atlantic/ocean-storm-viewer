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
export default function StationMarker(station_data, station_descriptions, time = new Date(), setSelectedStation) {
    if(isNaN(time))
      time= new Date()

    //Check if selected var contains any of the following
    //wind_speed, temperature, sea_surface_wave, air_pressure
    
    const station_name = station_data[0]
    const station_values = station_data[1]
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
      <Marker 
        key={station_name} 
        position={flip_coords(station_values.geometry.coordinates)}
        eventHandlers={{
          click: (e) => {
            console.log(e, "SETTING SELECTED STATION", station_data);
            setSelectedStation(station_data);
          },
        }}
      >
          <Popup > 
            <h4>{display_name}</h4>
          </Popup>
        </Marker>
    )
}