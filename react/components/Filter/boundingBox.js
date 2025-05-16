'use client';

import { Stack, IconButton } from "@mui/material";
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import React, { useEffect, useRef, useState } from 'react';
import {FeatureGroup, Circle, Control} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';






export default function RenderBoundingBox(map){
  let drawItems = new FeatureGroup();
  map.addLayer(drawItems);


  let drawControl = new Control.Draw({
    edit:{
      featureGroup: drawItems
    },
    draw:{
      polygon: true,
      polyline: true,
      rectangle: true,
      circle: true,
      marker: true,
    }
  })

  map.addControl(drawControl);
   // Ensure drawn items are added to the layer
   map.on(L.Draw.Event.CREATED, function (event) {
    let layer = event.layer;
    drawItems.addLayer(layer);
  });
};


export function RenderSpatialFilter({}){

  return(
    <Stack
    direction="column"
    
    spacing={0.1}>
      <IconButton  aria-label='search'className="spatial-filter-icon" sx={{top: "325px"}}
        >
      <RectangleOutlinedIcon
      sx={{
        fontSize: 'larger',
        
      }}
      />
      </IconButton>
      <IconButton  aria-label='search' className="spatial-filter-icon"sx={{top: "375px"}}
        >
        <PentagonOutlinedIcon
        sx={{
          fontSize: 'larger',
          
        }}
        />
      </IconButton>

    </Stack>
    
  )
  
}


