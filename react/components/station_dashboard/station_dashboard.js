import React, { useContext} from"react";
import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout";
import { useMediaQuery, Box, useTheme } from "@mui/material";
import StationDataLayout from "./station_layout_small_screen";
import BasicTabs from "./tabs";
import { getMatchedStation, getStationDataText, } from "../utils/station_data_format_util";
import { fetch_value } from "@/lib/storm_utils";
import { MapStates } from "../map";


/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 */




export default function StationDashboard({time, source_type, station_descriptions}) {
  const context = useContext(MapStates);
  const {selected_station, setSelectedStation, isStationDashOpen, setIsStationDashOpen, hover_point, selectedTab,
  setSelectedTab } = context;

  const stationData = selected_station;
  
  
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

  const hoverPointTime = fetch_value(hover_point, ["TIMESTAMP", "ISO_TIME"]);
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
            hoverPointTime={hoverPointTime}
          />
        
        
      </Box>
    </Box>
    ):(
      <Box
      key="01-station-dashboard"
      className={`station_dashboard`}
      sx={{display: isStationDashOpen ? 'flex':'none',
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
            setSelectedStation(empty_station_obj);
            setSelectedTab(0);
            setIsStationDashOpen(false);
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
            hoverPointTime={hoverPointTime}
          />
        
      </Box>
    </Box>
    )

  );
}
  