// https://iconoir.com/ icon library that can be installed via npm
import React, { useState, useMemo } from "react";
import { parseISO, format } from 'date-fns';
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, FeatureGroup, LayerGroup, Marker, Popup, Polygon, Polyline, GeoJSON } from 'react-leaflet'

import { useMap, useMapEvent, useMapEvents } from 'react-leaflet/hooks'
import { Icon, DivIcon, Point } from 'leaflet'
import Image from "next/image";

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import station_names from "../data/station/names.json"

import {RecentStationData} from './utils/station_data_util'
import { remap_coord_array, flip_coords, fetch_value } from "@/lib/storm_utils";

import { formatCioosStations, formatCioosDateTime, parseData } from './station_formats'
import RenderChart from './station_graph.js'
import StormMarker from "@/components/storm_point";

const defaultPosition = [46.9736, -54.69528]; // Mouth of Placentia Bay
const defaultZoom = 4

const hurricane_categories = {
  "5": {
    "min": 157,
    "max": null,
    "name": { "en": "Category 5", "fr": "catégorie 5" }
  },
  "4": {
    "min": 113,
    "max": 136,
    "name": { "en": "Category 4", "fr": "catégorie 4" }
  },
  "3": {
    "min": 96,
    "max": 112,
    "name": { "en": "Category 3", "fr": "catégorie 3" }
  },
  "2": {
    "min": 83,
    "max": 95,
    "name": { "en": "Category 2", "fr": "catégorie 2" }
  },
  "1": {
    "min": 64,
    "max": 82,
    "name": { "en": "Category 1", "fr": "catégorie 1" }
  },
  "TS": {
    "min": 34,
    "max": 63,
    "name": { "en": "Tropical Storm", "fr": "Tempête tropicale" }
  },
  "TD": {
    "min": 33,
    "max": null,
    "name": { "en": "Tropical Depression", "fr": "Dépression tropicale" }
  },
}


const empty_point_obj = { properties: {}, geometry: {} }

// Have it as a dictionary with time as keys and values as values?
function Station_Variable(name, std_name, value, units) {
  this.name = name;
  this.standard_name = std_name;
  this.value = value;
  this.units = units;
}


function PointDetails(point) {
  // If properties has no items, it's an empty point object and should return
  // immediately
  if (Object.keys(point.properties).length == 0) {
    return (<></>);
  }

  // ECCC and IBTRACS have multiple ways to define a storm type, some overlap and others are unique
  const storm_types = {
    "MX": "Mixture",
    "NR": "Not Reported",
    "SS": "Subtropical Storm",
    "ET": "Extratropical Storm",
    "DS": "Disturbance",
    "TD": "Tropical Depression",
    "TS": "Tropical Storm",
    "HU": "Hurricane",
    "HR": "Hurricane",
    "PT": "Post-Tropical Storm",
  };

  // ECCC and IBTRACS use different names for the same kinds of information.  Sometimes, within IBTRACS, several different fields may possibly contain the appropriate value
  // ECCC uses TIMESTAMP and IBTRACS uses ISO_TIME
  const TIMESTAMP = format(parseISO(fetch_value(point, ["TIMESTAMP", "ISO_TIME"])), 'PP pp X');
  const STORMNAME = fetch_value(point, ["STORMNAME", "NAME"]);
  const STORMTYPE = fetch_value(point, ["STORMTYPE", "NATURE"]);
  const STORMFORCE = fetch_value(point, ["STORMFORCE", "USA_SSHS"]);
  const MAXWIND = fetch_value(point, ["MAXWIND", "WMO_WIND", "USA_WIND"]);
  const MINPRESS = fetch_value(point, ["MSLP", "WMO_PRES", "USA_PRES"]);


  return (
    <div className="info_pane">
      <div>
        <h3>{STORMNAME}</h3>
        <p><strong>Storm Type:</strong> {storm_types[STORMTYPE]}</p>
        <p><strong>Storm Status:</strong> {point.properties.TCDVLP}</p>
        <p><strong>Storm Category:</strong> {STORMFORCE}</p>
        <p><strong>Timestamp:</strong> {TIMESTAMP}</p>
        <p><strong>Lat/Long:</strong> {point.properties.LAT}&deg; N, {point.properties.LON}&deg; W</p>
        <p><strong>Max Windspeed:</strong> {MAXWIND} knots ({(MAXWIND * 1.84).toFixed(2)} km/h)</p>
        <p><strong>Pressure:</strong> {MINPRESS}mb</p>
        {
          point.properties.ERRCT &&
          <p><strong>Error radius :</strong> {point.properties.ERRCT} nmi ({(point.properties.ERRCT * 1.852).toFixed(2)} km)</p>
        }
      </div>
    </div>
  )
}

export default function Map({ children, storm_data, station_data }) {
  // Add parameter for points
  // Points always there, even not in storm seasons
  const [hover_marker, setHoverMarker] = useState(empty_point_obj);


  // console.debug("Hover Marker: ", hover_marker.id, hover_marker.properties.TIMESTAMP);

  // console.log("Data");
  // console.log(Object.entries(station_data));
  // console.log(station_data);

  //let station_markers = [];
  //station_data.forEach((element, i) => station_markers[i] = Marker([element.geometry.coordinates[0], element.geometry.coordinates[1]]));

  // Define error cone object and populate it if the appropriate object is 
  // defined in storm_data, Leaflet requires the coordinates be flipped from 
  // the way it is encoded in the ECCC data.
  // 
  // Same for line track and storm radius polygons
  let err_cone = [];
  if (storm_data.err.features.length > 0) {
    err_cone = remap_coord_array(storm_data.err.features[0].geometry.coordinates[0]);
  }

  let line_track = [];
  if (storm_data.err.features.length > 0) {
    line_track = remap_coord_array(storm_data.lin.features[0].geometry.coordinates);
  }

  let storm_radius = [];
  if (storm_data.rad.features.length > 0) {
    storm_radius = remap_coord_array(storm_data.rad.features[0].geometry.coordinates);
  }
  // const parsedStationData = (station_data);

  // console.log("hurricane_icon: ", HurricaneIcon.src)
  // console.log("hurricon_div: ", hurricon_div)
  // console.log("hurricon: ", hurricon)

  return (
    <div className="map_container">
      <div className='inner_container'>
        {PointDetails(hover_marker)}
        <MapContainer
          center={defaultPosition}
          zoom={defaultZoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          <LayersControl position="topright">
            <LayersControl.Overlay checked name="ECCC Hurricane Response Zone">
              <LayerGroup>
                <WMSTileLayer
                  url="https://geo.weather.gc.ca/geomet"
                  layers='HURRICANE_RESPONSE_ZONE'
                  format='image/png'
                  transparent='true'
                  styles='HURRICANE_LINE_BLACK_DASHED'
                  attribution='<a href=&quot;https://www.canada.ca/en/environment-climate-change.html&quot;>ECCC</a>'
                  version='1.3.0'
                />
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Error Cone">
              <LayerGroup>
                {
                  err_cone.length > 0 &&
                  <Polygon positions={err_cone} />
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Points">
              <LayerGroup>
                {
                  storm_data.pts.features.map(point => {
                    return (
                      <StormMarker
                        storm_point_data={point}
                        setHoverMarker={setHoverMarker}
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Stations">
              <LayerGroup>
                { 
                  Object.entries(station_data).map((element) => {
                    const station_name = element[0]
                    const station_values = element[1] // Data for the individual station
                    const data_link = "https://cioosatlantic.ca/erddap/tabledap/" + station_name + ".html"
                    //Set or get time here somehow - command below can convert to unix timestamp
                    const time = new Date() //  1730404370000 for testing purposes, oct 31
                    const data_popup = RecentStationData(station_values, time)
                    const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name
                    // Data for station doesn't exist at the provided time

                    //const data_popup = null
                    if(!data_popup) return

                    // Option to toggle units
                    // If unit toggle changes table to have markers for unit conversion

                    //console.log("Station Name:", station_name);
                    //console.log(parsedStationData[station_name])

                    return (
                      <Marker 
                        key={element.station} 
                        position={flip_coords(station_values.geometry.coordinates)}
                        //eventHandlers={{click : )}}
                        /*
                          Move back under display_name
                        */
                        >
                          <Popup 
                            contentStyle={{
                              width: 'auto', // Adjust width based on content (chart)
                              padding: '20px', // Optional padding around chart
                              }}> 
                            <h4>{display_name}</h4>
                            <div>
                              <RenderChart  
                              chartData={station_values.properties.station_data}
                              stationName={station_name}
                              />
                            </div>
                            {data_popup}
                            <a href={data_link} target="_blank">Full data</a>
                          </Popup>
                        </Marker>

                    )
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Track Line">
              <LayerGroup>
                {
                  storm_data.lin.features.length > 0 &&
                  storm_data.lin.features.map(line => {

                    return (
                      <GeoJSON
                        key={line.id}
                        data={line}
                        style={{ className: 'line-of-travel' }}
                      />
                    )
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Wind Speed Radius">
              <LayerGroup>
                {
                  storm_data.rad.features.length > 0 &&
                  storm_data.rad.features.map(radii => {
                    // console.debug("Mapping radii...", radii);

                    let display_wind_speed_radii = true;
                    if (hover_marker.properties.TIMESTAMP != radii.properties.TIMESTAMP) {
                      display_wind_speed_radii = false;
                    }

                    const path_options = { className: 'wind-rad-'.concat(radii.properties.WINDFORCE) };
                    // const positions = radii.geometry.coordinates.map((coord_array) => {return coord_array[0]});

                    // console.debug("Multipolygon Positions: ", positions);

                    return (
                      // <Polygon
                      //   key={radii.properties.TIMESTAMP + radii.properties.WINDFORCE}
                      //   positions={positions}
                      //   pathOptions={path_options}

                      // >
                      //   <Popup>
                      //     <h3>{radii.properties.STORMNAME}</h3>
                      //     <p>Wind force: {radii.properties.WINDFORCE}</p>
                      //     <p>Timestamp: {radii.properties.TIMESTAMP}</p>
                      //   </Popup>
                      // </Polygon>
                      display_wind_speed_radii ? (
                        <GeoJSON
                          key={radii.id}
                          data={radii}
                          style={path_options}
                        />
                      ) : (
                        <></>
                      )
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Sea Height Radius">
              <LayerGroup>
                {
                  storm_data.sea.features.length > 0 &&
                  storm_data.sea.features.map(radii => {

                    let display_sea_height_radii = true;
                    if (hover_marker.properties.TIMESTAMP != radii.properties.TIMESTAMP) {
                      display_sea_height_radii = false;
                    }

                    const path_options = { className: 'sea-height' };
                    return (
                      display_sea_height_radii ? (
                        <GeoJSON
                          key={radii.id}
                          data={radii}
                          style={path_options}
                        />
                      ) : (
                        <></>
                      )
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  )
}