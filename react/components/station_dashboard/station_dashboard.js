import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout"
import { RenderWindRose } from "./wind_rose";
import BasicTabs from "./tabs";
import { RecentStationData, getDisplayName, getMatchedStation } from "../utils/station_data_format_util";
import styles from '../station_marker.module.css'
import RenderChart from '../station_graph.js'
import { BlockquoteLeft } from "react-bootstrap-icons";
import { Box } from "@mui/material";
import StationDataLayout from "./station_layout_small_screen";

/**
 * The `StationDashboard` function renders a dashboard for a selected station with relevant data and
 * tabs for different variables.
 * @returns The `StationDashboard` component is being returned, which contains a div with a class name
 * of "station_dashboard". Inside this div, there are two child elements: a div with a class name of
 * "dash-header" and a div with a class name of "dash-body". The "dash-header" div contains a button
 * with a close icon, a heading element with the display name of the station
 */
export default function StationDashboard({children, selected_station, setSelectedStation, station_descriptions, time, selectedTab, setSelectedTab, isDrawerOpen}) {
  
    const stationData = selected_station
      
    console.log(stationData)
      //Check if selected var contains any of the following
      //wind_speed, temperature, sea_surface_wave, air_pressure
      const stationName = stationData[0]
      const station_values = stationData[1]
      console.log(stationData)
      const data_text = RecentStationData(station_values, time)
  
      if (!data_text) 
        return null
  
      // Change to call from ERDDAP
      //const display_name = getDisplayName(station_descriptions, stationName);
      const station_description = getMatchedStation(station_descriptions, stationName)
      const display_name = station_description.title
      const institution = station_description.institution
      const institution_link = station_description.institution_link
      console.log(station_description)
      console.log(institution_link)
  
      const exclude_var = ['time', 'latitude', 'longitude','relative_humidity',
        'sea_surface_wave_from_direction', 'sea_surface_wave_maximum_period'
     ]
      const standardNames = station_values?.properties?.station_data?.column_std_names
      const variablePresence = {
        'wind_speed':false,
        'wind_from_direction':false,
        'temperature':false,
        'wave':false,
        'air_pressure':false
      }
      standardNames.forEach((varName) => {
        if(!exclude_var.includes(varName)){
          variablePresence['wind_speed'] = variablePresence['wind_speed'] ? true : varName.includes("wind_speed") ? true : false
          variablePresence['wind_from_direction'] = variablePresence['wind_from_direction'] ? true : varName.includes("wind_from_direction") ? true : false
          variablePresence['temperature'] = variablePresence['temperature'] ? true : varName.includes("temperature") ? true : false
          variablePresence['wave'] = variablePresence['wave'] ? true : varName.includes("wave") ? true : false
          variablePresence['air_pressure'] = variablePresence['air_pressure'] ? true : varName.includes("air_pressure") ? true : false
        }
      })
  
      //const display_name = (station_name in station_names) ? station_names[station_name]['display']:station_name
  
      // Data for station doesn't exist at the provided time

    return (
        <Box key="01-station-dashboard" 
        className={`station_dashboard ${isDrawerOpen ? 'drawerOpen' : 'drawerClosed'}`}
        sx={{
          bottom:{ xs: '20px', sm: '30px', md: '35px', lg: '50px', xl: '50px', xxl: '50px' }, // if changed, remember to change the footer height in the layout.js
        }}
        >
            <Box className="dash-header" sx={{
               fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' },
               padding:'10px'
               
            }}>
                <button
                    className="close"
                    onClick={(e) => {
                        setSelectedStation(empty_station_obj)
                        setSelectedTab(0)
                    }}
                    title="Close"
                    aria-label="Close"
                ><FaWindowClose/></button>
                <div> <strong>{display_name}</strong>
                  </div>
                <div><a href={institution_link || "#"} target="_blank" rel="noopener noreferrer">{institution || "Unknown Institution"}</a></div>
            </Box>
            <Box className="dash-body"
            sx={{
              fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' },
              overflow: 'auto'
            }}>
                <p>
                    <StationDataLayout  
                    stationName = {stationName}
                    stationData={station_values?.properties?.station_data}
                    stationSummaryText={data_text}
                    variablePresence={variablePresence}
                    /> 
                </p>
            </Box>
        </Box>
    )
}

/*
                    <BasicTabs  
                    stationName = {stationName}
                    stationData={station_values?.properties?.station_data}
                    stationSummaryText={data_text}
                    variablePresence={variablePresence}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    /> 
*/


