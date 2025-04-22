import React, { useState } from "react";
import Box from "@mui/material/Box";
import RenderStormChart from "./storm_graph";
import StormTypeChart from './storm_type_chart';
import StormCategoryChart from './storm_cat_chart';
import { RenderWindRose } from "../station_dashboard/wind_rose";


export default function CombinedLayout({ stormData, stormSummaryText, variablePresence, stormTime, hoverPointTime, stormType, stormCategory}) {
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
  
  

  

  return (
    <Box sx={{ width: "100%",
      fontSize: { xs: '12px', sm: '14px', }
      
     }}>
      

      {/* Storm Type */}
      {variablePresence["stormType"] && (
        <section className="station_dashboard_small_screen_section">
        <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px'}
          }}
          className="section-header"
        >{stormType['name']}</Box>
        <p>{<StormTypeChart chartData={stormType}/>}</p>
        
      </section>
      )}
      {/* Storm Category */}
      {variablePresence["stormType"] && (
        <section className="station_dashboard_small_screen_section">
          <Box
            sx= {{
              fontSize: { xs: '14px', sm: '16px'}
            }}
            className="section-header"
          >{stormCategory['name']}
          </Box>
          <p>{<StormCategoryChart chartData={stormCategory}/>}</p>
        
        </section>)}
      
      

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



    </Box>
  );
}