import React, { useState, useRef } from"react";
import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout";
import { useMediaQuery, Box } from "@mui/material";
import { fetch_value } from "@/lib/storm_utils";
import RenderStormChart from "./storm_graph";
import BasicTabs from "./tabs";
import { StormSummaryText } from "./storm_details";


//import BasicTabs from "./tabs";



/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 */


export default function StormDashboard({ storm_data, storm_points, source_type, hover_point, isDrawerOpen, setHoverMarker}) {

  const [selectedStormTab, setSelectedStormTab] = useState(0);
  console.log(storm_data, storm_points, source_type, hover_point);
  console.log(storm_points.pts.features)

  const stormPoints = storm_points.pts.features;
  console.log(stormPoints)

  const stormNameList = [];
  const stormTime = [];
  const stormType={
    data:[], 
    name:'Storm Type'
  }

  const stormCategory={data:[], name:'Storm Category'}

  let storm_data_dict = {
    stormDir:{data:[], name:'Storm Direction'},
    stormGust:{data:[], name:'Storm Gust'},
    stormPressure:{data:[], name:'Storm Pressure'},
    stormSpeed:{data:[], name:'Storm Speed'},
    stormWindSpeed:{data:[], name:'Storm Wind Speed'},
    stormSeaHgt:{data:[], name:'Storm Sea Height'}
  };

  stormPoints.forEach((storm_point)=> {
    
    //console.log(storm_point);
    stormNameList.push(fetch_value(storm_point, ["STORMNAME", "NAME"]));
    stormTime.push(fetch_value(storm_point, ["TIMESTAMP", "ISO_TIME"]));
    storm_data_dict.stormDir.data.push(storm_point.properties.STORM_DIR);
    storm_data_dict.stormSpeed.data.push(storm_point.properties.STORM_SPEED);
    stormCategory.data.push(fetch_value(storm_point, ["STORMFORCE", "USA_SSHS"]));
    storm_data_dict.stormGust.data.push(storm_point.properties.USA_GUST);
    storm_data_dict.stormWindSpeed.data.push(fetch_value(storm_point, ["MAXWIND", "WMO_WIND", "USA_WIND"]));
    storm_data_dict.stormPressure.data.push(fetch_value(storm_point, ["MSLP", "WMO_PRES", "USA_PRES"]));
    
    stormType.data.push(fetch_value(storm_point, ["STORMTYPE", "NATURE"]));
    storm_data_dict.stormSeaHgt.data.push(storm_point.properties.USA_SEAHGT)
  
  })
  const stormNameUniqueValues= [...new Set(stormNameList)];
  const stormName = stormNameUniqueValues[0];
  // Add on to check if more than one storm name exists in data

  console.log(stormName);

  const hoverPointTime = fetch_value(hover_point, ["TIMESTAMP", "ISO_TIME"]);


  console.log(storm_data_dict);

  const variablePresence={};
  Object.keys(storm_data_dict).forEach((key) => {
    variablePresence[key]= false;
  });


  variablePresence[stormType] = 
        Array.isArray(stormType['data']) && 
        stormType['data'].length > 0 && 
        stormType['data'].some(item => item !== undefined);


  variablePresence[stormType] = 
        Array.isArray(stormCategory['data']) && 
        stormCategory['data'].length > 0 && 
        stormCategory['data'].some(item => item !== undefined);



  Object.entries(storm_data_dict).forEach(([key, value]) => {
    variablePresence[key] = 
        Array.isArray(value['data']) && 
        value['data'].length > 0 && 
        value['data'].some(item => item !== undefined);
  });

  console.log(hover_point);



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
                //setHoverMarker(empty_station_obj);
                setSelectedStormTab(0);
              }}
              title="Close"
              aria-label="Close"
            >
              <FaWindowClose />
            </button>
            <div>
              <strong key='storm name'>{stormName}</strong>
            </div>
            
          </Box>
          <Box
            className="dash-body"
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
              
            }}
          ><BasicTabs
                      stormName={stormName}
                      stormData={storm_data_dict}
                      stormSummaryText={<StormSummaryText storm_point_hover={hover_point}/>}
                      variablePresence={variablePresence}
                      selectedStormTab={selectedStormTab}
                      setSelectedStormTab={setSelectedStormTab}
                      stormTime={stormTime}
                      hoverPointTime={hoverPointTime}
                      stormType={stormType}
                      stormCategory={stormCategory}
                    />
            
          </Box>
        </Box>
  )

  
}



//do graphh seperate for  storm type because it is categorical



