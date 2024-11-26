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
    const storm_type= storm_point_data.properties["NATURE"]

    return (
        <Marker
            key={storm_point_data.id}
            position={position}
            eventHandlers={{
                mouseover: (event) => setHoverMarker(storm_point_data),
                mouseout: (event) => setHoverMarker(empty_point_obj)
            }}
            icon={storm_types[storm_type]}
        >
        </Marker>
    );
}