import React, { useState, useRef } from 'react';
import StormDashboard from '../storm_dashboard/storm_dashboard';
import StationDashboard from '../station_dashboard/station_dashboard';
import { empty_point_obj } from '../storm_point_details';
import {empty_station_obj} from '../layout'
import { Stack } from '@mui/material';
import { useMediaQuery, Box, useTheme } from "@mui/material";
import { RenderSmallDashboard } from './Mobile_Dashboard/dashboard_small';




export function RenderDashboards({storm_points, source_type, hover_point, isDrawerOpen, selected_station,
    setSelectedStation,
    station_descriptions,
    time,
    selectedTab,
    setSelectedTab,
    isStormDashOpen, 
    setIsStormDashOpen,
    isStationDashOpen, 
    setIsStationDashOpen,
    isDashOpen, 
    }){
        

        const showStorm = isStormDashOpen;
        const showStation = isStationDashOpen;
            // Determine width dynamically
        const flexValue = showStorm && showStation ? 1 : 2; // 50% if both, 100% if one
        const theme = useTheme();
        const isSmall = useMediaQuery(theme.breakpoints.down('md')); // `md` in MUI = 960px
        const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
    
        if (!isDashOpen) return null;

    return (
    isExtraSmall && showStorm && showStation ? (
        <RenderSmallDashboard
        selected_station={selected_station}
        hover_point={hover_point}
        station_descriptions={station_descriptions}
        source_type={source_type}
        time={time}
        storm_points={storm_points}
        />
    ) : (
        <Stack
        key="combined-dashboard"
        className="dashboards"
        direction="row"
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
                hover_point={hover_point}
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
    )
    );
};



