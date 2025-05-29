// https://iconoir.com/ icon library that can be installed via npm
import React, { useState, useRef, useReducer } from "react";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, FeatureGroup, LayerGroup, Marker, Popup, useMap } from 'react-leaflet'
import Drawer from '@/components/drawer';

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

//import StormMarker from "@/components/storm_point";
import LineOfTravel from "@/components/line_of_travel";
import WindSpeedRadius from "@/components/wind_radii";
import SeaHeightRadius from "@/components/sea_height_radii";

import StationMarker from "./station_marker";
import ErrorCone from "@/components/error_cone";
import StormPointDetails, { empty_point_obj } from "@/components/storm_point_details";
import { useDatasetDescriptions } from "@/pages/api/all_erddap_dataset";
import { empty_station_obj } from "./layout";
import StationDashboard from "./station_dashboard/station_dashboard";
import { RenderStormSearch } from "./render_storm_search";
import { RenderFilter } from "./Filter/filter";
import { RenderBoundingBox } from "./Filter/boundingBox";
//import EditFeature from "./Filter/Edit_spatial_filter";
//import StationDashboardTest from "./station_dashboard/station_dashboard";
import { RenderSpatialFilter } from "./Filter/Edit_spatial_filter";
import CustomZoomControl from "./custom_zoom_control";
import StormDashboard from "./storm_dashboard/storm_dashboard";
import { RenderDashboards } from "./Dashboard/dashboard";
import StormMarker from "./stormPoint";
import { empty_storm_obj } from "@/lib/storm_utils";
import { mapReducer, initialMapState } from "./mapReducer";

const defaultPosition = [46.9736, -54.69528]; // Mouth of Placentia Bay
const defaultZoom = 4

export default function Map({ children, station_data, source_type,  setStationPoints}) {

  const clearShapesRef = useRef(null);

  // The state variable that contains the storm point currently being hovered 
  // over or clicked on
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [storm_points, setStormPoints] = useState(empty_storm_obj);
  const [hover_marker, setHoverMarker] = useState(empty_point_obj);
  const [selected_tab, setSelectedTab] = useState(0);
  const [selected_station, setSelectedStation] = useState(empty_station_obj);
  const [filterResult, setFilterResult] = useState({}); 
  const [returnFilterResult, setReturnFilterResult] = useState(false);
  const [polyFilterCoords, setPolyFilterCoords] = useState('');
  const [isDashOpen, setIsDashOpen] = useState(false);
  const [isStormDashOpen, setIsStormDashOpen] = useState(false);
  const [isStationDashOpen, setIsStationDashOpen] = useState(false);
  const [drawerButtonClicked, setDrawerButtonClicked] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startCategory, setStartCategory] = useState("");
  const [endCategory, setEndCategory] = useState("");
  const [showCatSelection, setShowCatSelection] = useState(false); 
  const [showDateSelection, setShowDateSelection] = useState(false); 
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  
  const allDatasetDescriptions = useDatasetDescriptions();

  

  console.log(allDatasetDescriptions)
  console.debug("Storm Points in map.js: ", storm_points);


  return (
    <div className="map_container">
      <div className='inner_container'>
        
        {
          <RenderFilter
          clearShapesRef={clearShapesRef} // Pass the ref to 
          state={state}
          dispatch={dispatch}
          
          
          
          />
        }
        {
          <RenderDashboards
            //storm_points={storm_points}
            source_type={source_type}
            //hover_point={hover_marker}
            //isDrawerOpen={isDrawerOpen}
            //selected_station={selected_station}
            //setSelectedStation={setSelectedStation}
            station_descriptions={allDatasetDescriptions}
            time = {new Date()}
            state={state}
            dispatch={dispatch}
            //selectedTab = {selected_tab}
            //setSelectedTab = {setSelectedTab}
            //isStormDashOpen={isStormDashOpen}
            //setIsStormDashOpen={setIsStormDashOpen}
            //isStationDashOpen={isStationDashOpen}
            //setIsStationDashOpen={setIsStationDashOpen}
            //isDashOpen= {isDashOpen}
            //setHoverMarker={setHoverMarker}
            />
        }
        
       
        <MapContainer
          center={defaultPosition}
          zoom={defaultZoom}
          style={{ height: "100%", width: "100%" }}
          worldCopyJump={true}
          zoomControl={false}
          
        > <CustomZoomControl /> 
          <Drawer
            element_id="left-side"
            classes="left"
            source_type={source_type}
            setStationPoints={setStationPoints}
            state={state}
            dispatch={dispatch}
          />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          <LayersControl position="bottomright">
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
            <LayersControl.Overlay checked name="Stations">
              <LayerGroup>
                {
                  station_data ? (
                    Object.entries(station_data).map((station) => {
                      console.log("Hover marker state:", state.hover_marker);
                      const storm_timestamp = new Date(state.hover_marker.properties["TIMESTAMP"])
                      return (
                        <StationMarker
                          station_data={station}
                          station_descriptions={allDatasetDescriptions}
                          time={storm_timestamp}
                          selected_station={state.selected_station}
                          dispatch={dispatch} 
                    />)
                      
                    })
                  ) : (
                    <></>
                  )
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Error Cone">
              <LayerGroup>
                {
                  state.storm_points?.err?.features?.map(err_cone => {
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
                  state.storm_points?.pts?.features?.map(point => {
                    return (

                      <StormMarker
                        key={point.id}
                        storm_point_data={point}
                        storm_point_hover= {state.hover_marker}
                        dispatch={dispatch}

                       
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Track Line">
              <LayerGroup>
                {
                  state.storm_points?.lin?.features?.length > 0 &&
                  state.storm_points?.lin?.features?.map(line => {

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
                  state.storm_points?.rad?.features?.length > 0 &&
                  state.storm_points?.rad?.features?.map(radii => {
                    return (
                      <WindSpeedRadius
                        key={radii.id}
                        storm_wind_radii_data={radii}
                        hover_marker={state.hover_marker}
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Sea Height Radius">
              <LayerGroup>
                {
                  state.storm_points?.sea?.features?.length > 0 &&
                  state.storm_points?.sea?.features?.map(radii => {
                    return (
                      <SeaHeightRadius
                        key={radii.id}
                        storm_sea_height_data={radii}
                        hover_marker={state.hover_marker}
                      />
                    );
                  })
                }
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>

          {<RenderSpatialFilter
          ref={clearShapesRef} 
          polyFilterCoords={state.polyFilterCoords}
          setPolyFilterCoords={(coords) => dispatch({ type: "SET_POLY_FILTER_COORDS", payload: coords })}
          />} {/* Calling the EditControl function here */}
        </MapContainer>
      </div>
    </div>
  )
}