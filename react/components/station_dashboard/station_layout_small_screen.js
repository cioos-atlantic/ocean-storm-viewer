import React from "react";
import Box from "@mui/material/Box";
import { RenderWindRose } from "./wind_rose";
import RenderChart from "../station_graph.js";

export default function StationDataLayout({stationName, stationData, stationSummaryText, variablePresence, hoverPointTime}){
  function generateGraph(selectedVar){
      return (
       <div className="station_chart" 
       style={{
       height: 'auto',
       width: 'auto', // Adjust width based on content (chart)
       padding: '0px', // Optional padding around chart
       display:'flex',
       }}>
       <RenderChart 
           sourceData={stationData}
           stationName={stationName}
           varCategory={selectedVar}
           hoverPointTime={hoverPointTime}
         />
     </div>
      )
  }

  const dataLink = "https://cioosatlantic.ca/erddap/tabledap/" + stationName + ".html"

  return (
    <Box sx={{ width: "100%",
      fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' }
      
     }}>
      {/* Summary Section */}
      <section className="station_dashboard_small_screen_section">
        <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
          }}
          className="section-header"
        >Summary</Box>
        <p>{stationSummaryText}</p>
        <div className="data-footer">
          <a href={dataLink} target="_blank" rel="noopener noreferrer">
            Full data
          </a>
        </div>
      </section>

      {/* Wind Speed Section */}
      {variablePresence["wind_speed"] && (
        <section className="station_dashboard_small_screen_section">
          <Box
            sx= {{
              fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
            }}
            className="section-header"
          >Wind Speed</Box>
          {generateGraph("wind_speed")}
        </section>
      )}

      {/* Wind Direction Section */}
      {variablePresence["wind_from_direction"] && (
        <section className="station_dashboard_small_screen_section">
          <Box className="section-header"
          sx= {{
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
          }}>Wind Direction</Box>
          <RenderWindRose
            sourceData={stationData}
            hasWindRoseData={variablePresence["wind_from_direction"]}
          />
        </section>
      )}

      {/* Temperature Section */}
      {variablePresence["temperature"] && (
        <section className="station_dashboard_small_screen_section">
          <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
          }}
          className="section-header"
          >Temperature</Box>
          {generateGraph("temperature")}
        </section>
      )}

      {/* Waves Section */}
      {variablePresence["wave"] && (
        <section className="station_dashboard_small_screen_section">
          <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
          }}
          className="section-header"
          >Waves</Box>
          {generateGraph("wave")}
        </section>
      )}

      {/* Pressure Section */}
      {variablePresence["air_pressure"] && (
        <section className="station_dashboard_small_screen_section">
          <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
          }}
          className="section-header"
          >Pressure</Box>
          {generateGraph("air_pressure")}
        </section>
      )}
    </Box>
  );
}