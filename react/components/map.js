// https://iconoir.com/ icon library that can be installed via npm
import React, { useState, useRef, useContext, createContext } from "react";
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
import { LayoutState } from "./layout";

const defaultPosition = [46.9736, -54.69528]; // Mouth of Placentia Bay
const defaultZoom = 4

export const MapStates = createContext();

export default function Map({ children, source_type  }) {

  const context = useContext(LayoutState);
  const {stormPoints, setStormPoints,station_points, setStationPoints, isSearchSubmitted, setIsSearchSubmitted, searchResult, setSearchResult, isDrawerOpen, setIsDrawerOpen} = context;
  const clearShapesRef = useRef(null);

  // The state variable that contains the storm point currently being hovered 
  // over or clicked on
  const [hover_marker, setHoverMarker] = useState(empty_point_obj);

  // The state variable that contains the station that was last clicked on
  
  const [selected_tab, setSelectedTab] = useState(0);
  //const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isStormDetOpen, setIsStormDetOpen] = useState(false); 
  const [selected_station, setSelectedStation] = useState(empty_station_obj);
  const [filterResult, setFilterResult] = useState({}); 
  const [returnFilterResult, setReturnFilterResult] = useState(false);
  const [bboxFilterCoordinates, setBboxFilterCoordinates]= useState('');
  const [polyFilterCoords, setPolyFilterCoords] = useState('');
  const [isStormDashOpen, setIsStormDashOpen] = useState(false);
  const [isStationDashOpen, setIsStationDashOpen] = useState(false);
  const [drawerButtonClicked, setDrawerButtonClicked] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startCategory, setStartCategory] = useState(null);
  const [endCategory, setEndCategory] = useState(null);
  const [showCatSelection, setShowCatSelection] = useState(false); 
  const [showDateSelection, setShowDateSelection] = useState(false); 
  
  const allDatasetDescriptions = useDatasetDescriptions();

  

  console.log(allDatasetDescriptions)
  console.debug("Storm Points in map.js: ", stormPoints);


  return (
    <MapStates.Provider value= {{hover_marker, setHoverMarker, selected_tab, setSelectedTab, selected_station, setSelectedStation, filterResult, setFilterResult, returnFilterResult, setReturnFilterResult, bboxFilterCoordinates, setBboxFilterCoordinates, polyFilterCoords, setPolyFilterCoords, isStormDashOpen, setIsStormDashOpen, isStationDashOpen, setIsStationDashOpen, drawerButtonClicked, setDrawerButtonClicked, startDate, setStartDate, endDate, setEndDate, startCategory, setStartCategory, endCategory, setEndCategory, showCatSelection, setShowCatSelection, showDateSelection, setShowDateSelection }}>
      <div className="map_container">
        <div className='inner_container'>
          {/*hover_marker !== empty_point_obj && (
            <StormPointDetails
              storm_point_hover={hover_marker}
              //onClose={() => setHoverMarker(empty_point_obj)} // Close popup when the marker is reset
              setIsStormDetOpen= {setIsStormDetOpen}
              setHoverMarker= {setHoverMarker}
            />
          )*/}

          {/*
            <RenderStormSearch
              isSearchSubmitted = {isSearchSubmitted}
              setIsSearchSubmitted= {setIsSearchSubmitted}
              searchResult= {searchResult}
              setSearchResult={setSearchResult}
              setIsDrawerOpen= {setIsDrawerOpen}
              isDrawerOpen= {isDrawerOpen}/>
          */}
          {/*hover_marker !== empty_point_obj && (
            <StormDashboard
              stormPoints={stormPoints}
              stormPoints={stormPoints}
              source_type={source_type}
              hover_point={hover_marker}
              isDrawerOpen={isDrawerOpen}
              setHoverMarker={setHoverMarker}/>
          )*/}
          {
            <RenderFilter/>
          }
          {
            <RenderDashboards
              stormPoints={stormPoints}
              stormPoints={stormPoints}
              source_type={source_type}
              hover_point={hover_marker}
              isDrawerOpen={isDrawerOpen}
              setHoverMarker={setHoverMarker}
              selected_station={selected_station}
              setSelectedStation={setSelectedStation}
              station_descriptions={allDatasetDescriptions}
              storm_timestamp = {new Date()}
              selectedTab = {selected_tab}
              setSelectedTab = {setSelectedTab}
              isStormDashOpen={isStormDashOpen}
              setIsStormDashOpen={setIsStormDashOpen}
              isStationDashOpen={isStationDashOpen}
              setIsStationDashOpen={setIsStationDashOpen}
              />
          }
          
          {/*selected_station !== empty_station_obj && (
            <StationDashboard
              selected_station={selected_station}
              setSelectedStation={setSelectedStation}
              stationsDescriptions={allDatasetDescriptions}
              station_descriptions={allDatasetDescriptions}
              storm_timestamp = {new Date()}
              selectedTab = {selected_tab}
              setSelectedTab = {setSelectedTab}
              isDrawerOpen= {isDrawerOpen}
              isStormDetOpen= {isStormDetOpen}
              setIsStormDetOpen= {setIsStormDetOpen}
              source_type = {source_type}
            ></StationDashboard>
          )*/}
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
              stormPoints={stormPoints}
              source_type={source_type}
              setStormPoints={setStormPoints}
              setStationPoints={setStationPoints}
              setIsDrawerOpen= {setIsDrawerOpen}
              isDrawerOpen= {isDrawerOpen}
              setSelectedStation={setSelectedStation}
              isSearchSubmitted = {isSearchSubmitted}
              setIsSearchSubmitted= {setIsSearchSubmitted}
              searchResult= {searchResult}
              setSearchResult={setSearchResult}
              filterResult = {filterResult}
              setFilterResult = {setFilterResult}
              returnFilterResult= {returnFilterResult}
              setReturnFilterResult = {setReturnFilterResult}
              drawerButtonClicked={drawerButtonClicked}
              setDrawerButtonClicked={setDrawerButtonClicked}
              
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
                    station_points ? (
                      Object.entries(station_points).map((station) => {
                        const storm_timestamp = new Date(hover_marker.properties["TIMESTAMP"])
                        return StationMarker(station, allDatasetDescriptions, storm_timestamp, selected_station, setSelectedStation, setSelectedTab, setIsStationDashOpen)
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
                    stormPoints.err.features.map(err_cone => {
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
                    stormPoints.pts.features.map(point => {
                      return (

                        <StormMarker
                          key={point.id}
                          storm_point_data={point}
                          setHoverMarker={setHoverMarker}
                          setIsStormDashOpen={setIsStormDashOpen}
                          storm_point_hover= {hover_marker}
                        
                        />
                      );
                    })
                  }
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Track Line">
                <LayerGroup>
                  {
                    stormPoints.lin.features.length > 0 &&
                    stormPoints.lin.features.map(line => {

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
                    stormPoints.rad.features.length > 0 &&
                    stormPoints.rad.features.map(radii => {
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
                    stormPoints.sea.features.length > 0 &&
                    stormPoints.sea.features.map(radii => {
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

            {<RenderSpatialFilter
            ref={clearShapesRef} 
            polyFilterCoords={polyFilterCoords}
            setPolyFilterCoords={setPolyFilterCoords}
            />} {/* Calling the EditControl function here */}
          </MapContainer>
        </div>
      </div>

    </MapStates.Provider>
    
  )
}