import React, { useState, useRef, useContext } from 'react';
import StormDashboard from '../storm_dashboard/storm_dashboard';
import StationDashboard from '../station_dashboard/station_dashboard';
import { empty_point_obj } from '../storm_point_details';
import {empty_station_obj} from '../layout'
import { Stack } from '@mui/material';
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { RenderSmallDashboard } from './Mobile_Dashboard/dashboard_small';
import { MapStates } from '../map';






export function RenderDashboards({source_type, time, storm_points, station_descriptions}){
    const context = useContext(MapStates);
    const {isStormDashOpen, isStationDashOpen, isDrawerOpen} = context;
        

        const showStorm = isStormDashOpen;
        const showStation = isStationDashOpen;
            // Determine width dynamically
        const flexValue = showStorm && showStation ? 1 : 2; // 50% if both, 100% if one
        const theme = useTheme();
        const isSmall = useMediaQuery(theme.breakpoints.down('md')); // `md` in MUI = 960px
        const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
    
        return (
            (isExtraSmall && showStorm && showStation) ? (
                <RenderSmallDashboard
                    source_type={source_type}
                    time={time}
                    storm_points={storm_points}
                    station_descriptions={station_descriptions}/>
            ):(
                <Stack
                key="combined-dashboard"
                className={`dashboards`}
                direction='row'
                sx={{
                    bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
                    width: {
                      xs: "100%",
                      md: "100%",
                      lg: isDrawerOpen ? "calc(100vw - 258px)" : "100%",
                    },
                    marginLeft: {
                      xs: 0,
                      md: 0,
                      lg: isDrawerOpen ? "258px" : 0,
                    },
                    gap: 0,
                    display: "flex",
                    alignItems: "stretch",
                    maxHeight: { xs: "45%", md: "55%" },
                  }}
            >
                {showStorm && (
                    <Box sx={{ flex: flexValue, minWidth: showStation ? "50%" : "100%" }}> 
                        <StormDashboard 
                            storm_points={storm_points}
                        />
                    </Box>
                )}
    
                {showStation && (
                    <Box sx={{ flex: flexValue, minWidth: showStorm ? "50%" : "100%" }}>
                        <StationDashboard
                            time={time}
                            source_type={source_type}
                            station_descriptions={station_descriptions}
                            
                        />
                    </Box>
                )}
            </Stack>
            )
            
        );
};



