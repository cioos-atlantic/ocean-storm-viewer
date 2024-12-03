// https://iconoir.com/ icon library that can be installed via npm
import React, { useState } from "react";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, FeatureGroup, LayerGroup, Marker, Popup } from 'react-leaflet'
import Drawer from '@/components/drawer';

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import StormMarker from "@/components/storm_point";
import LineOfTravel from "@/components/line_of_travel";
import WindSpeedRadius from "@/components/wind_radii";
import SeaHeightRadius from "@/components/sea_height_radii";

import StationMarker from "./station_marker";
import ErrorCone from "@/components/error_cone";
import StormPointDetails, { empty_point_obj } from "@/components/storm_point_details";
import { useDatasetDescriptions } from "@/pages/api/all_erddap_dataset";

const defaultPosition = [46.9736, -54.69528]; // Mouth of Placentia Bay
const defaultZoom = 4


// Have it as a dictionary with time as keys and values as values?
function Station_Variable(name, std_name, value, units) {
  this.name = name;
  this.standard_name = std_name;
  this.value = value;
  this.units = units;
}

export default function Map({ children, storm_points, storm_data, station_data, source_type, setStormPoints, setStationPoints, setHistoricalStormData }) {
  // Add parameter for points
  // Points always there, even not in storm seasons
  const [hover_marker, setHoverMarker] = useState(empty_point_obj);
  const allDatasetDescriptions = useDatasetDescriptions();
  console.log(allDatasetDescriptions)
  
  console.debug("Storm Points in map.js: ", storm_points);




  return (
    <div className="map_container">
      <div className='inner_container'>
      {hover_marker !== empty_point_obj && (
        <StormPointDetails
          storm_point_hover={hover_marker}
          onClose={() => setHoverMarker(empty_point_obj)} // Close popup when the marker is reset
        />
      )}
        
        <MapContainer
          center={defaultPosition}
          zoom={defaultZoom}
          style={{ height: "100%", width: "100%" }}
          worldCopyJump={true}
        >
          <Drawer 
            element_id="left-side" 
            classes="left"
            storm_data={storm_data}
            source_type={source_type}
            setStormPoints={setStormPoints}
            setStationPoints={setStationPoints}
          />

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
                  storm_points.err.features.map(err_cone => {
                    return (
                      <ErrorCone
                        key={err_cone.id}
                        error_cone_data={err_cone}
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Points">
              <LayerGroup>
                {
                  storm_points.pts.features.map(point => {
                    return (
                      
                      <StormMarker
                        key={point.id}
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
                    const storm_timestamp = new Date(hover_marker.properties["TIMESTAMP"])
                    return StationMarker(element, allDatasetDescriptions, storm_timestamp)
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Track Line">
              <LayerGroup>
                {
                  storm_points.lin.features.length > 0 &&
                  storm_points.lin.features.map(line => {

                    return (
                      <LineOfTravel
                        key={line.id}
                        storm_line_data={line}
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Wind Speed Radius">
              <LayerGroup>
                {
                  storm_points.rad.features.length > 0 &&
                  storm_points.rad.features.map(radii => {
                    return (
                      <WindSpeedRadius
                        key={radii.id}
                        storm_wind_radii_data={radii}
                        hover_marker={hover_marker}
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Sea Height Radius">
              <LayerGroup>
                {
                  storm_points.sea.features.length > 0 &&
                  storm_points.sea.features.map(radii => {
                    return (
                      <SeaHeightRadius
                        key={radii.id}
                        storm_sea_height_data={radii}
                        hover_marker={hover_marker}
                      />
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