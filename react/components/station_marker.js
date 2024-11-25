import React, { useState, useMemo } from "react";
import station_names from "../data/station/names.json"
import {RecentStationData} from './utils/station_data_format_util'
import RenderChart from './station_graph.js'
import { flip_coords } from "@/lib/storm_utils";

import { Marker, Popup } from "react-leaflet";


const empty_data_text = {}

/**
 * 
 * @param {[Object]} station_data Station Data object after being retrieved from WFS and processed. 
 * First element is station name, second element is a dictionary of station data. See readme for format
 * @param {Date} time Time of the station data to retrieve. Defaults to most recent data if not provided
 * @returns StationMarker JavaScript snippet
 */
export default function StationMarker(station_data, time = new Date()) {
    if(isNaN(time))
      time= new Date()
    const station_name = station_data[0]
    const station_values = station_data[1]
    const data_link = "https://cioosatlantic.ca/erddap/tabledap/" + station_name + ".html"
    const data_text = RecentStationData(station_values, time)

    // Change to call from ERDDAP
    const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name

    // Data for station doesn't exist at the provided time
    if(!data_text) return

    return (
      <Marker 
        key={station_name} 
        position={flip_coords(station_values.geometry.coordinates)}
        >
          <Popup 
            contentStyle={{
              width: 'auto', // Adjust width based on content (chart)
              padding: '20px', // Optional padding around chart
              }}> 
            <h4>{display_name}</h4>
            {data_text}
            <a href={data_link} target="_blank">Full data</a>
          </Popup>
        </Marker>
    )
}