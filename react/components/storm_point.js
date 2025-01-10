import React, { useState, useEffect } from "react";
import { Marker, Popup } from 'react-leaflet'
import { Icon, DivIcon, Point } from 'leaflet'
import HurricaneIcon from '../public/hurricane.svg'
import TropicalStormIcon from '../public/tropical-storm.svg'
import TropicalDisturbanceIcon from '../public/storm_types/DI_icon.svg'
import ExtratropicalIcon from '../public/storm_types/ET_icon.svg'
import MixtureIcon from '../public/storm_types/MX_icon.svg'
import NotReportedIcon from '../public/storm_types/NR_icon.svg'
import PostTropicalIcon from '../public/storm_types/PT_icon.svg'
import SubTropicalIcon from '../public/storm_types/SS_icon.svg'
import TropicalDepressionIcon from '../public/storm_types/TD_icon.svg'
import TropicalStormIcon2 from '../public/storm_types/TS_icon.svg'
import { storm_categories, storm_type_info } from '@/lib/storm_class'
import { change_icon_url } from "./utils/storm_display_utils";


import { remap_coord_array, flip_coords, fetch_value } from "@/lib/storm_utils";
import {empty_point_obj} from "@/components/storm_point_details"


export const hurricon = new Icon({
    iconUrl: HurricaneIcon.src,
    iconRetinaUrl: HurricaneIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 70],
});

export const tropstrmicon = new Icon({
    iconUrl: TropicalStormIcon.src,
    iconRetinaUrl: TropicalStormIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
});

export const disticon = new Icon({
    iconUrl: TropicalDisturbanceIcon.src,
    iconRetinaUrl: TropicalDisturbanceIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
});

export const extratropicon = new Icon({
    iconUrl: ExtratropicalIcon.src,
    iconRetinaUrl: ExtratropicalIcon.src,
    iconSize: [42, 70],
    iconAnchor: [21, 35],
});

export const mixicon = new Icon({
    iconUrl: MixtureIcon.src,
    iconRetinaUrl: MixtureIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
});

export const notreportedicon = new Icon({
    iconUrl: NotReportedIcon.src,
    iconRetinaUrl: NotReportedIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
});

export const posttropicon = new Icon({
    iconUrl: PostTropicalIcon.src,
    iconRetinaUrl: PostTropicalIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
});

export const subtropicon = new Icon({
    iconUrl: SubTropicalIcon.src,
    iconRetinaUrl: SubTropicalIcon.src,
    iconSize: [42, 70],
    iconAnchor: [21, 35],
});

export const tropdepricon = new Icon({
    iconUrl: TropicalDepressionIcon.src,
    iconRetinaUrl: TropicalDepressionIcon.src,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
});

export const tropstrmicon2 = new Icon({
    iconUrl: TropicalStormIcon2.src,
    iconRetinaUrl: TropicalStormIcon2.src,
    iconSize: [42, 70],
    iconAnchor: [21, 35],
});


const storm_types = {
    "MX": mixicon,
    "NR": notreportedicon,
    "SS": subtropicon,
    "ET": extratropicon,
    "DS": disticon,
    "TD": tropdepricon,
    "TS": tropstrmicon2,
    "HU": hurricon,
    "HR": hurricon,
    "PT": posttropicon,
};


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
export default function StormMarker({ storm_point_data, setHoverMarker, setShowPopup }) {

    const position = flip_coords(storm_point_data.geometry.coordinates);

    let clicked = false;
    // Keep track of previously clicked marker to default back to?

    const storm_type = storm_point_data.properties["NATURE"];
    const storm_icon = storm_types[storm_type];
    const storm_category = String(storm_point_data.properties["USA_SSHS"]);
    let arcColor, ellipseColor, textColor, arcStroke;

    const [customIcon, setCustomIcon] = useState(storm_icon);

    if (storm_category === "undefined") {
        arcColor = "#000000";
        ellipseColor = "#000000";
        textColor = "#000000";
        arcStroke = "#000000";
    } else {
        //console.log(storm_categories[storm_category])
        arcColor = storm_categories[storm_category]["arcColor"];
        arcStroke = storm_categories[storm_category]["arcStroke"];
        ellipseColor = storm_categories[storm_category]["ellipseColor"];
        textColor = storm_categories[storm_category]["textColor"];
    }

    //console.log(storm_point_data.properties)
    // console.log(String(storm_point_data.properties["USA_SSHS"]));

    const svgPath = storm_type_info[storm_type]["exp_img"];
    //console.log(storm_type_info[storm_type])
    //storm_type_info[storm_type]["img"]
    //const arcColor = storm_categories[storm_category]["arcColor"];
    //const ellipseColor = storm_categories[storm_category]["ellipseColor"];
    //const textColor = storm_categories[storm_category]["textColor"];
    //const icon = storm_types[storm_type];

    useEffect(() => {
        (async () => {
            const arcColor = storm_categories[storm_category]?.arcColor || "#000000";
            const arcStroke = storm_categories[storm_category]?.arcStroke || "#000000";
            const ellipseColor = storm_categories[storm_category]?.ellipseColor || "#000000";
            const textColor = storm_categories[storm_category]?.textColor || "#000000";

            const updatedIcon = await change_icon_url(
                storm_icon,
                svgPath,
                arcColor,
                arcStroke,
                ellipseColor,
                textColor
            );
            setCustomIcon(updatedIcon);
        })();
    }, [storm_category, svgPath]);

    return (
        <Marker
            key={storm_point_data.id}
            position={position}
            eventHandlers={{
                mouseover: (event) => setHoverMarker(storm_point_data),
                click: (event) => {
                    setHoverMarker(storm_point_data);
                    clicked = true;
                },
                mouseout: (event) => {
                    if (!clicked) {
                        setHoverMarker(empty_point_obj);
                    }
                }
            }}
            icon={customIcon}
        >
        </Marker>
    );
}
//icon={storm_types[storm_type]}



