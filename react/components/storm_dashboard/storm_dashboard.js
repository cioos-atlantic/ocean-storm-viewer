import React, { useState, useRef } from"react";
import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout";
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { fetch_value } from "@/lib/storm_utils";
import RenderStormChart from "./storm_graph";
import BasicTabs from "./tabs";
import { StormSummaryText } from "./storm_details";
import StormDataLayout from "./storm_layout_small_screen";
import { convert_unit_data } from "../utils/unit_conversion";
import StormCategory from "../Storm_popup/storm_category";


//import BasicTabs from "./tabs";



/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 */


export default function StormDashboard({ storm_data, storm_points, source_type, hover_point, isDrawerOpen, setHoverMarker, isStormDashOpen, setIsStormDashOpen}) {

  const [selectedStormTab, setSelectedStormTab] = useState(0);
  //console.log(storm_data, storm_points, source_type, hover_point);
  console.log(storm_points.pts.features)

  const stormPoints = storm_points.pts.features;
  console.log(stormPoints)
  const ibtracs_link = 'https://www.ncei.noaa.gov/products/international-best-track-archive';

  const stormNameList = [];
  const stormTime = [];
  const stormType={
    data:[], 
    name:'Storm Type'
  }

  const stormCategory={data:[], name:'Storm Category'}
  const storm_data_dict ={
    direction: [{stormDir: { data: [], name: "Storm Direction (degree)" }}],
    Pressure: [{stormPressure: { data: [], name: "Storm Pressure (kPa)" }}],
    speed: [{stormSpeed: { data: [], name: "Storm Speed (km/h)" }}],
    seaHeight: [{stormSeaHgt: { data: [], name: "Storm Sea Height (m)" }}],
    'Wind Speed': [{stormWindSpeed: { data: [], name: "Storm Wind Speed (km/h)" }},
    {stormGust: { data: [], name: "Storm Gust (km/h)" }}],

  }



  stormPoints.forEach((storm_point)=> {
    
    //console.log(storm_point);
    stormNameList.push(fetch_value(storm_point, ["STORMNAME", "NAME"]));
    stormTime.push(fetch_value(storm_point, ["TIMESTAMP", "ISO_TIME"]));
    storm_data_dict.direction[0].stormDir.data.push(storm_point.properties.STORM_DIR);
    
    stormCategory.data.push(fetch_value(storm_point, ["STORMFORCE", "USA_SSHS"]));


    // convert gust, storm speed and wind speed from knots to Kmh to synchronize with station chart
    const gust_in_Kmh = convert_unit_data(storm_point.properties.USA_GUST, 'knots', 'km/h')
    const stormWindSpeed_in_knots = fetch_value(storm_point, ["MAXWIND", "WMO_WIND", "USA_WIND"])
    const stormWindSpeed_in_Kmh = convert_unit_data(stormWindSpeed_in_knots, 'knots', 'km/h')
    const stormSpeed_in_Kmh = convert_unit_data(storm_point.properties.STORM_SPEED, 'knots', 'km/h')
    

    storm_data_dict.speed[0].stormSpeed.data.push(stormSpeed_in_Kmh.value);
    storm_data_dict['Wind Speed'][1].stormGust.data.push(gust_in_Kmh.value);
    storm_data_dict['Wind Speed'][0].stormWindSpeed.data.push(stormWindSpeed_in_Kmh.value);
    const pressure_in_mb = fetch_value(storm_point, ["MSLP", "WMO_PRES", "USA_PRES"])|| []
    
    const pressure_in_kpa= convert_unit_data(pressure_in_mb, 'mbar', 'kPa')
                             
    storm_data_dict.Pressure[0].stormPressure.data.push(pressure_in_kpa.value);
    
    stormType.data.push(fetch_value(storm_point, ["STORMTYPE", "NATURE"]));

    const seaHeight_in_m = convert_unit_data(storm_point.properties.USA_SEAHGT, 'ft', 'm');
    storm_data_dict.seaHeight[0].stormSeaHgt.data.push(seaHeight_in_m.value);
  
  })
  const stormNameUniqueValues= [...new Set(stormNameList)];
  const stormName = stormNameUniqueValues[0];
  // Add on to check if more than one storm name exists in data
  const theme = useTheme();
  console.log(stormName);
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const isSmall = useMediaQuery(theme.breakpoints.down('md')); // `md` in MUI = 960px

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


  variablePresence[stormCategory] = 
        Array.isArray(stormCategory['data']) && 
        stormCategory['data'].length > 0 && 
        stormCategory['data'].some(item => item !== undefined);



  Object.entries(storm_data_dict).forEach(([key, value]) => {
    variablePresence[key] = 
      Array.isArray(value) && 
      value.some(obj => {
        const [innerKey, innerValue] = Object.entries(obj)[0]; // Extract the key-value pair
        return innerValue?.data?.length > 0 && innerValue.data.some(item => item !== undefined && item !== null);
      });
  });

  console.log(hover_point);



  return(
    isExtraSmall ? (
      <Box
      key="storm-dashboard"
      className={`station_dashboard`}
      sx={{
        //bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
        display: isStormDashOpen ? 'flex':'none',
        
        
        
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
            console.log("closed")
            //setHoverMarker(empty_station_obj);
            setSelectedStormTab(0);
            setIsStormDashOpen(false)
          }}
          title="Close"
          aria-label="Close"
        >
          <FaWindowClose />
        </button>
        <div>
          <strong key='storm name'>{stormName}</strong>
        </div>
        <div>
          <a href={ibtracs_link} target="_blank" rel="noopener noreferrer">
          International Best Track Archive for Climate Stewardship (IBTrACS) Project
          </a>
        </div>
        
      </Box>
      <Box
        className="dash-body"
        sx={{
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
          
        }}
      ><StormDataLayout
                  stormData={storm_data_dict}
                  stormSummaryText={<StormSummaryText storm_point_hover={hover_point}/>}
                  variablePresence={variablePresence}
                  stormTime={stormTime}
                  hoverPointTime={hoverPointTime}
                  stormType={stormType}
                  stormCategory={stormCategory}
                />
        
      </Box>
    </Box>
    ):(
      <Box
      key="storm-dashboard"
      className={`station_dashboard`}
      sx={{
        //bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
        display: isStormDashOpen ? 'flex':'none',
        
        
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
            console.log("closed")
            //setHoverMarker(empty_station_obj);
            setSelectedStormTab(0);
            setIsStormDashOpen(false)
          }}
          title="Close"
          aria-label="Close"
        >
          <FaWindowClose />
        </button>
        <div>
          <strong key='storm name'>{stormName}</strong>
        </div>
        <div>
          <a href={ibtracs_link} target="_blank" rel="noopener noreferrer">
          International Best Track Archive for Climate Stewardship (IBTrACS) Project
          </a>
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
    
  )

  
}



//do graphh seperate for  storm type because it is categorical



