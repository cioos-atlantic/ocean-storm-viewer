import React, { useState, useEffect } from "react";
import { Marker, Popup } from 'react-leaflet'
import { Icon, DivIcon, Point } from 'leaflet'
import { storm_categories, storm_type_info } from '@/lib/storm_class'
import { remap_coord_array, flip_coords, fetch_value } from "@/lib/storm_utils";
import {empty_point_obj} from "@/components/storm_point_details"
import { Tooltip } from 'react-leaflet';
import { useMediaQuery, useTheme } from '@mui/material';
import StormPointDetailsSmallScreen from "./storm_point_details_small_screens";






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
export default function StormMarker1({ storm_point_data, setHoverMarker, setIsStormDashOpen, storm_point_hover }) {
    const [isMounted, setIsMounted] = useState(false);
    const [customIcon, setCustomIcon] = useState(null);

    let clicked = false;
    // Keep track of previously clicked marker to default back to?

    const position = flip_coords(storm_point_data.geometry.coordinates);
    const storm_type = storm_point_data.properties["NATURE"];
    const storm_category = String(storm_point_data.properties["USA_SSHS"]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
    }, [storm_category, storm_point_hover]);

    if (!isMounted || !customIcon) return null;

    return (
        <Marker
            key={storm_point_data.id}
            position={position}
            eventHandlers={{
                mouseover: () => {
                    setHoverMarker(storm_point_data);
                    setIsStormDashOpen(true);
                },
                click: () => {
                    setHoverMarker(storm_point_data);
                    setIsStormDashOpen(true);
                    clicked = true;
                },
                mouseout: () =>  {
                    if (!clicked) {
                        setHoverMarker(empty_point_obj);
                        setIsStormDashOpen(false);
                    }}
            }}
            icon={customIcon}
        >
            {/*isSmallScreen && (
                <Tooltip direction="top" offset={[0, -10]} permanent={false}>
                    <StormPointDetailsSmallScreen
                        storm_point_hover={storm_point_hover}
                        setHoverMarker={setHoverMarker}
                    />
                </Tooltip>
            )*/}
        </Marker>
    );
}

const createSvgIconWithText = (text = "A", fill = "#0077be", size = 40, textColor = 'white') => {
    const fontSize = (size / 2) - 2;
     
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${fill}" 
                stroke="black" stroke-width="1.5" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
              fill="${textColor}" font-size="${fontSize}" font-family="Arial, sans-serif"
              >
          ${text}
        </text>
      </svg>
    `;
    
    return L.divIcon({
      html: svg,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  