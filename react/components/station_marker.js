import React, { useState, useMemo } from "react";
import station_names from "../data/station/names.json"
import { RecentStationData } from './utils/station_data_format_util'
import RenderChart from './station_graph.js'
import { flip_coords } from "@/lib/storm_utils";
import { empty_station_obj } from "./layout"

import { Marker, Tooltip, Popup, Icon } from "react-leaflet";

import { getDisplayName } from "./utils/station_data_format_util";
import styles from './station_marker.module.css'


/**
 * 
 * @param {[Object]} station_data Station Data object after being retrieved from WFS and processed. 
 * First element is station name, second element is a dictionary of station data. See readme for format
 * @param {Date} time Time of the station data to retrieve. Defaults to most recent data if not provided
 * @returns StationMarker JavaScript snippet
 */
export default function StationMarker(station_data, station_descriptions, time = new Date(), selected_station, setSelectedStation, setSelectedTab) {
  // Turns selected marker red, others return as blue
  function getMarkerIcon(selected_station, station_name) {
    try {
      if (station_name === selected_station[0]) {
        return redIcon
      }
      else {
        return blueIcon
      }
    } catch (error) {
      return blueIcon
    }
  }

  //Check if selected var contains any of the following
  //wind_speed, temperature, sea_surface_wave, air_pressure

  const station_name = station_data[0]
  const station_values = station_data[1]
  // Change to call from ERDDAP
  const display_name = getDisplayName(station_descriptions, station_name);

  const exclude_var = ['time', 'latitude', 'longitude', 'wind_from_direction', 'relative_humidity',
    'sea_surface_wave_from_direction', 'sea_surface_wave_maximum_period'
  ]
  const standardNames = station_values?.properties?.station_data?.column_std_names


  //const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name

  // Data for station doesn't exist at the provided time
  const redIcon = new L.Icon.Default({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/refs/heads/master/img/marker-icon-2x-red.png'
  })

  const blueIcon = new L.Icon.Default()
  let selectedIcon = new L.Icon.Default()

  return (
    <Marker
      key={station_name}
      position={flip_coords(station_values?.geometry?.coordinates)}
      icon={getMarkerIcon(selected_station, station_name)}
      eventHandlers={{
        click: (e) => {
          console.log(e, "SETTING SELECTED STATION", station_data);
          setSelectedStation(station_data);
          setSelectedTab(0);
        }
      }}
    >
      <Tooltip>
        <h4>{display_name}</h4>
      </Tooltip>
    </Marker>
  )
}