import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout";
import { useMediaQuery, Box } from "@mui/material";
import StationDataLayout from "./station_layout_small_screen";
import BasicTabs from "./tabs";
import { RecentStationData, getMatchedStation } from "../utils/station_data_format_util";

/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 */


export default function StationDashboardTest({
  selected_station,
  setSelectedStation,
  station_descriptions,
  time,
  selectedTab,
  setSelectedTab,
  isDrawerOpen,
  isStormDetOpen, 
  setIsStormDetOpen
}) {

 
  const stationData = selected_station;
  
  const isExtraSmall = useMediaQuery("(max-width:600px)");
  if (!stationData) return null;

  const stationName = stationData[0];
  const stationValues = stationData[1];
  const dataText = RecentStationData(stationValues, time);

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
  const variablePresence = {
    wind_speed: false,
    wind_from_direction: false,
    temperature: false,
    wave: false,
    air_pressure: false,
  };

  standardNames.forEach((varName) => {
    if (!excludeVars.includes(varName)) {
      variablePresence.wind_speed ||= varName.includes("wind_speed");
      variablePresence.wind_from_direction ||= varName.includes("wind_from_direction");
      variablePresence.temperature ||= varName.includes("temperature");
      variablePresence.wave ||= varName.includes("wave");
      variablePresence.air_pressure ||= varName.includes("air_pressure");
    }
  });

  return (
    isExtraSmall ? (
      <Box
      key="01-station-dashboard"
      className={`station_dashboard ${isDrawerOpen ? "drawerOpen" : "drawerClosed"}`}
      sx={{
        bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
        maxHeight:  "45%", // Adjust max height for extra-small screens
        
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
            setSelectedStation(empty_station_obj);
            setSelectedTab(0);
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
          />
        
        
      </Box>
    </Box>
    ):(
      <Box
      key="01-station-dashboard"
      className={`station_dashboard ${isDrawerOpen ? "drawerOpen" : "drawerClosed"} ${isStormDetOpen ? "stormDetOpen" : ""} `}
      sx={{
        bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
        maxHeight: "80%", 
        
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
            setSelectedStation(empty_station_obj);
            setSelectedTab(0);
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
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        
      </Box>
    </Box>
    )

  );
}
