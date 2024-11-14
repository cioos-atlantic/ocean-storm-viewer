// import React, { useState, useMemo } from "react";
import { Marker, Popup } from 'react-leaflet'
import { Icon, DivIcon, Point } from 'leaflet'
import HurricaneIcon from '../public/hurricane.svg'
import TropicalStormIcon from '../public/tropical-storm.svg'

import {empty_point_obj} from "@/components/storm_point_details"

import { remap_coord_array, flip_coords, fetch_value } from "@/lib/storm_utils";

export const hurricon = new Icon({
    iconUrl: HurricaneIcon.src,
    iconRetinaUrl: HurricaneIcon.src,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

export const tropstrmicon = new Icon({
    iconUrl: TropicalStormIcon.src,
    iconRetinaUrl: TropicalStormIcon.src,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

export default function StormMarker({ storm_point_data, setHoverMarker }) {
    const position = flip_coords(storm_point_data.geometry.coordinates);

    return (
        <Marker
            key={storm_point_data.id}
            position={position}
            eventHandlers={{
                mouseover: (event) => setHoverMarker(storm_point_data),
                mouseout: (event) => setHoverMarker(empty_point_obj)
            }}
            icon={hurricon}
        >
        </Marker>
    );
}