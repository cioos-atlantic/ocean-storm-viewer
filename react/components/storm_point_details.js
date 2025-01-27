import { parseISO, format } from 'date-fns';
import { fetch_value } from "@/lib/storm_utils";
import React, {useState} from "react";
import StormType from './Storm_popup/Storm_type';
import StormCategory from './Storm_popup/storm_category';
import StormPressure from './Storm_popup/storm_pressure';
import { Box, useMediaQuery } from '@mui/material';


export const empty_point_obj = { properties: {}, geometry: {} }


/**
 * This function displays detailed information about a storm point on a map.
 * It takes in two parameters:
 * @param {Object} storm_point_hover - An object representing the storm point data.
 * @param {Function} onClose - A function to be called when the close button is clicked.
 * 
 * The function first checks if the storm point data is empty. If it is, it returns an empty JSX element.
 * Then, it extracts relevant information from the storm point data using the `fetch_value` function.
 * The extracted information includes the timestamp, storm name, storm type, storm force, maximum wind speed, and minimum pressure.
 * 
 * The function then renders the storm point details in a JSX format, including the extracted information and any additional details.
 */
export default function StormPointDetails({ storm_point_hover,  setIsStormDetOpen, setHoverMarker }) {
    // If properties has no items, it's an empty storm_point_hover object and should return
    // immediately
    if (Object.keys(storm_point_hover.properties).length == 0) {
        return (<></>);
    }

    // ECCC and IBTRACS have multiple ways to define a storm type, some overlap and others are unique

    const isExtraSmall = useMediaQuery("(max-width:600px)");

    // ECCC and IBTRACS use different names for the same kinds of information.  Sometimes, within IBTRACS, several different fields may possibly contain the appropriate value
    // ECCC uses TIMESTAMP and IBTRACS uses ISO_TIME
    const TIMESTAMP = format(parseISO(fetch_value(storm_point_hover, ["TIMESTAMP", "ISO_TIME"])), 'PP pp X');
    const STORMNAME = fetch_value(storm_point_hover, ["STORMNAME", "NAME"]);
    const STORMTYPE = fetch_value(storm_point_hover, ["STORMTYPE", "NATURE"]);
    const STORMFORCE = fetch_value(storm_point_hover, ["STORMFORCE", "USA_SSHS"]);
    const MAXWIND = fetch_value(storm_point_hover, ["MAXWIND", "WMO_WIND", "USA_WIND"]);
    const MINPRESS = fetch_value(storm_point_hover, ["MSLP", "WMO_PRES", "USA_PRES"]);



    return (
        
        <Box className="info_pane"
        sx={{
            padding: 2,
            fontSize: { xs: '12px', sm: '12px', md: '16px', lg: '16px' }, // Adjust font size for different screen widths
            marginTop:  { xs: '35%', sm: '18%', md: '15%', lg: '11%' } , // Adjust margin-top for different screen widths
            
            bottom: {sm: '7%', md: '10%', lg: '10%'}

          }}>
            <div>
                <button 
                onClick={() =>{
                    setHoverMarker(empty_point_obj)
                    setIsStormDetOpen(false);}
                    } 
                style={{ float: "right", cursor: "pointer" }}
                aria-label="Close Storm Details"
                >✖
                </button>
                <h3>{STORMNAME}</h3>
                <StormType STORMTYPE={STORMTYPE} />
                <p><strong>Storm Status:</strong> {storm_point_hover.properties.TCDVLP}</p>
                <StormCategory STORMFORCE={STORMFORCE} />
                <p><strong>Timestamp:</strong> {TIMESTAMP}</p>
                <p><strong>Lat/Long:</strong> {storm_point_hover.properties.LAT}&deg; N, {storm_point_hover.properties.LON}&deg; W</p>
                <p><strong>Max Windspeed:</strong> {MAXWIND} knots ({(MAXWIND * 1.84).toFixed(2)} km/h)</p>
                <StormPressure STORMPRESSURE={MINPRESS} />
                {
                    storm_point_hover.properties.ERRCT &&
                    <p><strong>Error radius :</strong> {storm_point_hover.properties.ERRCT} nmi ({(storm_point_hover.properties.ERRCT * 1.852).toFixed(2)} km)</p>
                }
            </div>

        </Box>
        
        
    )
}