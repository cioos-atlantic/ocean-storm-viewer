import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import StormDashboard from '../storm_dashboard/storm_dashboard';
import StationDashboard from '../station_dashboard/station_dashboard';
import { empty_point_obj } from '../storm_point_details';
import {empty_station_obj} from '../layout'
import { Stack } from '@mui/material';



export function RenderDashboards({storm_data, storm_points, source_type, hover_point, isDrawerOpen, setHoverMarker,selected_station,
    setSelectedStation,
    station_descriptions,
    time,
    selectedTab,
    setSelectedTab,
    isStormDashOpen, 
    setIsStormDashOpen,
    isStationDashOpen, 
    setIsStationDashOpen
    }){
        

        const showStorm = isStormDashOpen;
        const showStation = isStationDashOpen;
            // Determine width dynamically
        const flexValue = showStorm && showStation ? 1 : 2; // 50% if both, 100% if one
    
        return (
            <Stack
                key="combined-dashboard"
                className={`dashboards ${isDrawerOpen ? "drawerOpen" : "drawerClosed"}`}
                direction='row'
                sx={{
                    bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
                    width: "100%",
                    gap: 0,
                    display: "flex",
                    alignItems: "stretch", // Ensures both boxes are equal height
                    maxHeight:  { xs: "45%",  md: "55%" }, 
                }}
            >
                {showStorm && (
                    <Box sx={{ flex: flexValue, minWidth: showStation ? "50%" : "100%" }}> 
                        <StormDashboard 
                            storm_data={storm_data}
                            storm_points={storm_points}
                            source_type={source_type}
                            hover_point={hover_point}
                            isDrawerOpen={isDrawerOpen}
                            setHoverMarker={setHoverMarker}
                            isStormDashOpen={isStormDashOpen}
                            setIsStormDashOpen={setIsStormDashOpen}
                        />
                    </Box>
                )}
    
                {showStation && (
                    <Box sx={{ flex: flexValue, minWidth: showStorm ? "50%" : "100%" }}>
                        <StationDashboard
                            selected_station={selected_station}
                            setSelectedStation={setSelectedStation}
                            stationsDescriptions={station_descriptions}
                            station_descriptions={station_descriptions}
                            storm_timestamp={new Date()}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            source_type={source_type}
                            isStationDashOpen={isStationDashOpen}
                            setIsStationDashOpen={setIsStationDashOpen}
                            hover_point={hover_point}
                        />
                    </Box>
                )}
            </Stack>
        );
};



