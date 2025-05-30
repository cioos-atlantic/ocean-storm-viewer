import React, { useState, useEffect, useRef } from "react";
import { Marker, Popup } from 'react-leaflet'
import { Icon, DivIcon, Point } from 'leaflet'
import { storm_categories, storm_type_info } from '@/lib/storm_class'
import { remap_coord_array, flip_coords, fetch_value } from "@/lib/storm_utils";
import {empty_point_obj} from "@/components/storm_point_details"
import { Tooltip } from 'react-leaflet';
import { useMediaQuery, useTheme } from '@mui/material';
import StormPointDetailsTooltip from "./storm_dashboard/storm_point_details_tooltip";
import { createSvgIconWithText } from "./utils/storm_display_utils";






/**
 * This function represents a React component that renders a storm marker on a map.
 * It takes in three props: storm_point_data, setHoverMarker, and setShowPopup.
 *
 * @param {Object} storm_point_data - The data object representing a storm point.
 * @param {Function} setHoverMarker - A function to set the hovered marker.
 * @param {Function} setShowPopup - A function to show or hide the popup.
 *
 * @returns {JSX.Element} - A React Marker component with event handlers and custom icon.
 */
export default function StormMarker({ storm_point_data, setHoverMarker, setIsStormDashOpen, storm_point_hover, setIsDashOpen }) {
    const [isMounted, setIsMounted] = useState(false);
    const [customIcon, setCustomIcon] = useState(null);
    const markerRef = useRef(null);

    console.log(storm_point_hover)

    
    const clickedRef = useRef(false);

    // Keep track of previously clicked marker to default back to?

    const position = flip_coords(storm_point_data.geometry.coordinates);
    const storm_type = storm_point_data.properties["NATURE"];
    const storm_category = String(storm_point_data.properties["USA_SSHS"]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    console.log(storm_point_data);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        (async () => {
            const isSelected = storm_point_data.id === storm_point_hover?.id;

            const fallbackColor = "#e6e1e1";
            //console.log(storm_category)
            const categoryInfo = storm_categories[storm_category] || {};

            const arcColor = isSelected ? "#ff0000" : categoryInfo.arcColor || fallbackColor;
            const textColor = isSelected ? "#ffffff" : categoryInfo.textColor || "ff0000";
            const iconSize = isSelected ? 40 : 25;

            //console.log(arcColor, textColor)

            setCustomIcon(createSvgIconWithText(storm_type, arcColor, iconSize, textColor))
            
            
            

              
        })();
    }, [storm_category, storm_point_hover, storm_point_data]);

    if (!isMounted || !customIcon) return null;

    return (
        
        <Marker
            key={storm_point_data.id}
            position={position}
            ref={markerRef}
            eventHandlers={{
                mouseover: () => {
                    setHoverMarker(storm_point_data);
                    setIsDashOpen(true);
                    setIsStormDashOpen(true);
                    
                    markerRef.current?.openPopup();
                },
                click: () => {
                    setHoverMarker(storm_point_data);
                    setIsDashOpen(true);
                    setIsStormDashOpen(true);
                    clickedRef.current = true;
                },
                mouseout: () =>  {
                    if (!clickedRef.current) {
                        //setHoverMarker(empty_point_obj);
                        markerRef.current?.closePopup();
                    }}
            }}
            icon={customIcon}
        >
            { storm_point_hover && (
                <Popup
                    closeButton={false}
                    autoPan={false}
                    closeOnEscapeKey={false}
                    closeOnClick={false}
                    interactive={false}
                >
                    <StormPointDetailsTooltip
                        storm_point_hover={storm_point_data}
                        
                    />
                </Popup>
)}
        </Marker>
    );
}



  