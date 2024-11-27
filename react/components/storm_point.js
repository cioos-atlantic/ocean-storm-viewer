// import React, { useState, useMemo } from "react";
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


import { remap_coord_array, flip_coords, fetch_value } from "@/lib/storm_utils";
import {empty_point_obj} from "@/components/storm_point_details"

export const hurricon = new Icon({
    iconUrl: HurricaneIcon.src,
    iconRetinaUrl: HurricaneIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const tropstrmicon = new Icon({
    iconUrl: TropicalStormIcon.src,
    iconRetinaUrl: TropicalStormIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const disticon = new Icon({
    iconUrl: TropicalDisturbanceIcon.src,
    iconRetinaUrl: TropicalDisturbanceIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const extratropicon = new Icon({
    iconUrl: ExtratropicalIcon.src,
    iconRetinaUrl: ExtratropicalIcon.src,
    iconSize: [23, 38],
    iconAnchor: [14, 14],
});

export const mixicon = new Icon({
    iconUrl: MixtureIcon.src,
    iconRetinaUrl: MixtureIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const notreportedicon = new Icon({
    iconUrl: NotReportedIcon.src,
    iconRetinaUrl: NotReportedIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const posttropicon = new Icon({
    iconUrl: PostTropicalIcon.src,
    iconRetinaUrl: PostTropicalIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const subtropicon = new Icon({
    iconUrl: SubTropicalIcon.src,
    iconRetinaUrl: SubTropicalIcon.src,
    iconSize: [23, 38],
    iconAnchor: [14, 14],
});

export const tropdepricon = new Icon({
    iconUrl: TropicalDepressionIcon.src,
    iconRetinaUrl: TropicalDepressionIcon.src,
    iconSize: [25, 25],
    iconAnchor: [14, 14],
});

export const tropstrmicon2 = new Icon({
    iconUrl: TropicalStormIcon2.src,
    iconRetinaUrl: TropicalStormIcon2.src,
    iconSize: [23, 38],
    iconAnchor: [14, 14],
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


export default function StormMarker({ storm_point_data, setHoverMarker }) {
    const position = flip_coords(storm_point_data.geometry.coordinates);
    const storm_type= storm_point_data.properties["NATURE"];
    const storm_category = String(storm_point_data.properties["USA_SSHS"])
    let arcColor, ellipseColor, textColor, arcStroke;

    if (!storm_category){
        arcColor = "#000000";
        ellipseColor= "#000000";
        textColor = "#000000";
        arcStroke = "#000000";

    }

    


    console.log(storm_point_data.properties)
    console.log(String(storm_point_data.properties["USA_SSHS"]))
    
    const svgPath = "storm_types/experimental/ET_icon.svg"   //storm_type_info[storm_type]["img"]
    //const arcColor= storm_categories[storm_category]["arcColor"];
    //const ellipseColor= storm_categories[storm_category]["ellipseColor"];
    //const textColor= storm_categories[storm_category]["textColor"];
    //const icon=storm_types[storm_type];
    //change_icon_url(extratropicon, svgPath, arcColor, ellipseColor, textColor);

    return (
        <Marker
            key={storm_point_data.id}
            position={position}
            eventHandlers={{
                mouseover: (event) => setHoverMarker(storm_point_data),
                mouseout: (event) => setHoverMarker(empty_point_obj)
            }}
            icon={extratropicon}
        >
        </Marker>
    );
}
//icon={storm_types[storm_type]}

async function change_icon_url(icon, svgPath, arcColor, arcStroke, ellipseColor, textColor) {
    try {
        // Fetch the external SVG file
        const response = await fetch(svgPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch SVG: ${response.statusText}`);
        }

        // Get the SVG content as text
        let svgContent = await response.text();

        // Replace placeholder values with the provided colors
        svgContent = svgContent
            .replace(/var\(--arc-fill\)/g, arcColor)
            .replace(/var\(--ellipse-stroke\)/g, ellipseColor)
            .replace(/var\(--text-color\)/g, textColor)
            .replace(/var\(--arc-stroke\)/g, arcStroke);

        // Encode the updated SVG as a Data URL
        const updatedIconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

        // Update the existing Leaflet icon
        icon.options.iconUrl = updatedIconUrl;
        icon.options.iconRetinaUrl = updatedIconUrl;

        // Trigger Leaflet to refresh the icon
        if (icon._map) {
            icon._map.eachLayer((layer) => {
                if (layer instanceof L.Marker && layer.options.icon === icon) {
                    layer.setIcon(icon);
                }
            });
        }
    } catch (error) {
        console.error("Error updating SVG icon:", error);
    }
}
