import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout";
import { useMediaQuery, Box } from "@mui/material";
import { fetch_value } from "@/lib/storm_utils";
import RenderStormChart from "./storm_graph";


//import BasicTabs from "./tabs";



/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 */


export default function StormDashboard({ storm_data, storm_points, source_type, hover_point, isDrawerOpen
  
}) {
  console.log(storm_data, storm_points, source_type, hover_point);
  console.log(storm_points.pts.features)

  const stormPoints = storm_points.pts.features;
  console.log(stormPoints)

  const stormNameList = [];
  const stormDir = [];
  const stormSpeed = [];
  const stormCategory = [];
  const stormGust = [];
  const stormWindSpeed = [];
  const stormPressure = [];
  const stormTime = [];
  const stormType = [];
  const stormSeaHgt = [];

  stormPoints.forEach((storm_point)=> {
    
    console.log(storm_point);
    stormNameList.push(fetch_value(storm_point, ["STORMNAME", "NAME"]));
    stormDir.push(storm_point.STORM_DIR);
    stormSpeed.push(storm_point.STORM_SPEED);
    stormCategory.push(fetch_value(storm_point, ["STORMFORCE", "USA_SSHS"]));
    stormGust.push(storm_point.USA_GUST);
    stormWindSpeed.push(fetch_value(storm_point, ["MAXWIND", "WMO_WIND", "USA_WIND"]));
    stormPressure.push(fetch_value(storm_point, ["MSLP", "WMO_PRES", "USA_PRES"]));
    stormTime.push(fetch_value(storm_point, ["TIMESTAMP", "ISO_TIME"]));
    stormType.push(fetch_value(storm_point, ["STORMTYPE", "NATURE"]));
    stormSeaHgt.push(storm_point.USA_SEAHGT)
  
  })
  const stormNameUniqueValues= [...new Set(stormNameList)];
  const stormName = stormNameUniqueValues[0];
  // Add on to check if more than one storm name exists in data

  console.log(stormName);

  let storm_data_dict = {
    stormName,
    stormCategory,
    stormDir,
    stormGust,
    stormPressure,
    stormType,
    stormTime,
    stormSpeed,
    stormWindSpeed,
    stormSeaHgt
  };
  console.log(storm_data_dict);

  return(
    <Box
          key="storm-dashboard"
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
              fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "18px" },
              padding: "10px",
            }}
          >
            <button
              className="close"
              onClick={() => {
                console.log("closed")
              }}
              title="Close"
              aria-label="Close"
            >
              <FaWindowClose />
            </button>
            <div>
              <strong key='storm name'>Storm Name</strong>
            </div>
            
          </Box>
          <Box
            className="dash-body"
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
              
            }}
          >{<RenderStormChart
            sourceData={stormCategory}
            varCategory={'StormSpeed'}
            timeData={stormTime} />}
            
          </Box>
        </Box>
  )

  
}



export function processStormData(storm_points){
  console.log(storm_points.pts.features)

  const stormPoints = storm_points.pts.features;
  console.log(stormPoints)

  const stormNameList = [];
  const stormDir = [];
  const stormSpeed = [];
  const stormCategory = [];
  const stormGust = [];
  const stormWindSpeed = [];
  const stormPressure = [];
  const stormTime = [];
  const stormType = [];
  const stormSeaHgt = [];

  stormPoints.forEach((storm_point)=> {
    
    console.log(storm_point);
    stormNameList.push(fetch_value(storm_point, ["STORMNAME", "NAME"]));
    stormDir.push(storm_point.STORM_DIR);
    stormSpeed.push(storm_point.STORM_SPEED);
    stormCategory.push(fetch_value(storm_point, ["STORMFORCE", "USA_SSHS"]));
    stormGust.push(storm_point.USA_GUST);
    stormWindSpeed.push(fetch_value(storm_point, ["MAXWIND", "WMO_WIND", "USA_WIND"]));
    stormPressure.push(fetch_value(storm_point, ["MSLP", "WMO_PRES", "USA_PRES"]));
    stormTime.push(fetch_value(storm_point, ["TIMESTAMP", "ISO_TIME"]));
    stormType.push(fetch_value(storm_point, ["STORMTYPE", "NATURE"]));
    stormSeaHgt.push(storm_point.USA_SEAHGT)
  
  })
  const stormNameUniqueValues= [...new Set(stormNameList)];
  const stormName = stormNameUniqueValues[0];
  // Add on to check if more than one storm name exists in data

  console.log(stormName);
}
  

