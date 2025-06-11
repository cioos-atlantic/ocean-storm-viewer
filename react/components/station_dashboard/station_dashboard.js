import React, { useState, useRef } from"react";
import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout";
import { useMediaQuery, Box, useTheme } from "@mui/material";
//import { empty_station_obj } from "../layout";
//import { useMediaQuery, Box } from "@mui/material";
import StationDataLayout from "./station_layout_small_screen";
import BasicTabs from "./tabs";
//import { RecentStationData, getMatchedStation } from "../utils/station_data_format_util";
//import BasicTabs from "./tabs";
import { RecentStationData, getMatchedStation, getStationDataText, } from "../utils/station_data_format_util";
//import BasicTabs from "./tabs";
import { fetch_value } from "@/lib/storm_utils";
import { RenderSmallDashboard } from "../Dashboard/Mobile_Dashboard/dashboard_small";
import { RowingSharp } from "@mui/icons-material";


/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 */


export default function StationDashboard({state, dispatch, station_descriptions, time, source_type
}) {

  const stationData = state.selected_station;
  console.log(stationData);
  
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md')); // `md` in MUI = 960px
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  if (!stationData) return null;

  const stationName = stationData[0];
  const stationValues = stationData[1];
  // Determine if active or historic
  const isHistorical = source_type == "historical" ? true : false
  const dataText = getStationDataText(stationValues, time, isHistorical);

  if (!dataText) return null;

  const stationDescription = getMatchedStation(station_descriptions, stationName);
  const displayName = stationDescription.title || "Unknown Station";
  const institution = stationDescription.institution || "Unknown Institution";
  const institutionLink = stationDescription.institution_link || "#";

  const excludeVars = [
    "time",
    "latitude",
    "longitude",
    "relative_humidity",
    "sea_surface_wave_from_direction",
    "sea_surface_wave_maximum_period",
  ];
  const standardNames = stationValues?.properties?.station_data?.column_std_names || [];
  const rowData = stationValues?.properties?.station_data?.rows;
  //console.log(rowData);
  const variablePresence = {
    wind_speed: false,
    wind_from_direction: false,
    temperature: false,
    wave: false,
    air_pressure: false,
  };



  standardNames.forEach((varName, indx) => {
    if (!excludeVars.includes(varName)) {

      
      rowData.forEach((datalist) => {
         if (datalist[indx]) {
            variablePresence.wind_speed ||= varName.includes("wind_speed");
            variablePresence.wind_from_direction ||= varName.includes("wind_from_direction");
            variablePresence.temperature ||= varName.includes("temperature");
            variablePresence.wave ||= varName.includes("wave");
            variablePresence.air_pressure ||= varName.includes("air_pressure");
         }
      })


      
      
    }
    
   
    
  });
  console.log(variablePresence);

  const hoverPointTime = fetch_value(state.hover_marker, ["TIMESTAMP", "ISO_TIME"]);
  console.log(hoverPointTime);

 

  return (
    isExtraSmall ? (
      <Box
      key="01-station-dashboard"
      className={`station_dashboard`}
      sx={{
        display:  'flex',
      }}
    >
      <Box
        className="dash-header"
        sx={{
          fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "18px" },
          padding: "10px",
          
        }}
      >
        <button
          className="close"
          onClick={() => {
            dispatch({ type: "CLOSE_STATION_DASHBOARD"});
          }}
          title="Close"
          aria-label="Close"
        >
          <FaWindowClose />
        </button>
        <div>
          <strong key={displayName}>{displayName}</strong>
        </div>
        <div>
          <a href={institutionLink} target="_blank" rel="noopener noreferrer">
            {institution}
          </a>
        </div>
      </Box>
      <Box
        className="dash-body"
        sx={{
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
          
        }}
      >
        
          <StationDataLayout
            stationName={stationName}
            stationData={stationValues?.properties?.station_data}
            stationSummaryText={dataText}
            variablePresence={variablePresence}
            hoverPointTime={hoverPointTime}
          />
        
        
      </Box>
    </Box>
    ):(
      <Box
      key="01-station-dashboard"
      className={`station_dashboard`}
      sx={{display: state.isStationDashOpen ? 'flex':'none',
        //bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
        
        
      }}
    >
      <Box
        className="dash-header"
        sx={{
          fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "18px" },
          padding: "10px",
        }}
      >
        <button
          className="close"
          onClick={() => {
            dispatch({ type: "CLOSE_STATION_DASHBOARD"});
            dispatch({ type: "TOGGLE_STATION_DASH", payload: false});
            //setIsStationDashOpen(false);
          }}
          title="Close"
          aria-label="Close"
        >
          <FaWindowClose />
        </button>
        <div>
          <strong key={displayName}>{displayName}</strong>
        </div>
        <div>
          <a href={institutionLink} target="_blank" rel="noopener noreferrer">
            {institution}
          </a>
        </div>
      </Box>
      <Box
        className="dash-body"
        sx={{
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
           
        }}
      >
          <BasicTabs
            stationName={stationName}
            stationData={stationValues?.properties?.station_data}
            stationSummaryText={dataText}
            variablePresence={variablePresence}
            selectedTab={state.selectedTab}
            setSelectedTab={(tab) => dispatch({ type: "SET_SELECTED_TAB", payload: tab })}
            hoverPointTime={hoverPointTime}
          />
        
      </Box>
    </Box>
    )

  );
}
  