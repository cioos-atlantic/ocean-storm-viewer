import React, { useEffect, useRef, useState } from 'react';
import { get_station_field_data, get_station_field_units } from './utils/station_data_format_util';
import { Mix } from '@ant-design/charts';

export function RenderWindRose ( { sourceData, position, stationName }){
    useEffect(() => { 
        const station_dirData = get_station_field_data(sourceData, 'wind_from_direction', "column_std_names");
        const windSpeeds = processWindSpeeds(sourceData);
        console.log(windSpeeds)
        const unit = get_station_field_units(sourceData,"wind_speed", "column_std_names");
        const station_timeData = get_station_field_data(sourceData, "time", "column_std_names");
        const time_data_point= station_timeData.length;
          console.log(time_data_point);
    
          Object.keys(windSpeeds).map((windSpeedKey, index)=> {
            const windSpeed = windSpeeds[windSpeedKey];
            console.log(windSpeed)
            const windData = calculateWindSpeedDistribution(station_dirData, windSpeed, time_data_point);
            console.log(windData)
          
            
          })
      }, [sourceData]);
}


const windSpeedBins = [
  { min: 0, max: 8, label: "=< 8" },
  { min: 8, max: 16, label: "9-16" },
  { min: 16, max: 24, label: "17-24" },
  { min: 24, max: 32, label: "25-32" },
  { min: 32, max: 40, label: "33-40" },
  { min: 40, max: 48, label: "41-48" },
  { min: 48, max: 56, label: "49-56" },
  { min: 56, max: 64, label: "57-64" },
  { min: 64, max: undefined, label: ">= 65" },

];
const colorPalette= ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#FF6384','#36A2EB','#FFCE56'];

function categorizeWindDirection(direction) {
  const cardinalPoints = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const sectors = 360 / cardinalPoints.length;
  const index = Math.round(direction / sectors) % cardinalPoints.length;
  return cardinalPoints[index];
}

function categorizeWindSpeed(speed) {
  for (const bin of windSpeedBins) {
    if (speed >= bin.min && (bin.max === undefined || speed < bin.max)) {
      return bin.label; // Return the label instead of the index
    }
  }
  return "Unknown"; // For speeds that don't match any bin
}

const cardinalPoints = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

function makeEmptyfreqObj(windSpeedBins, cardinalPoints){
  const freqObj =  {};
  cardinalPoints.forEach((point)=>{
    freqObj[point] = new Array(windSpeedBins.length).fill(0);});
  
  console.log(freqObj);

  return freqObj
  
}

function makeFreqFraction(freqObj, totalDataPoints){
  console.log(totalDataPoints)
  const freqFrac= structuredClone(freqObj);

  Object.values(freqFrac).forEach((point) =>{
    console.log(point)


    point.forEach((value, index) => {
      
      point[index] = (value / totalDataPoints) * 100

    });
  });

  console.log(freqFrac);
  return freqFrac
}

function extractWindSpeedBins(){
  const windSpdLabel= []
    
    windSpeedBins.forEach((obj) =>
      {windSpdLabel.push(obj.label)})

    return windSpdLabel
}
function makeGroupedList(directions, speeds){
    const groupedList = [];
    directions.forEach((direction, index) => {
    
        const cardinal = categorizeWindDirection(direction);
        //console.log(cardinal)
        const speedBin = categorizeWindSpeed(speeds[index]);
    
        groupedList.push({
          windSpeed : speeds[index],
          speedBin : speedBin,
          direction : direction,
          cardinal : cardinal,
        });
      });

    return groupedList

}


// Calculate wind speed distribution per direction
function calculateWindSpeedDistribution(directions, speeds, totalDataPoints) {

  
  const freqObj = makeEmptyfreqObj(windSpeedBins, cardinalPoints);

  const windSpdLabel = extractWindSpeedBins();
  
  const groupedList = makeGroupedList(directions, speeds)

  groupedList.forEach((dataPoint) => {
    const cardinalList= freqObj[dataPoint.cardinal];
    const windIdx= windSpdLabel.findIndex((lbl) => lbl === dataPoint.speedBin);
    cardinalList[windIdx]++;
  });
    
  console.log(groupedList.length);
  const freqFrac= makeFreqFraction(freqObj, totalDataPoints);

  const windChartData = parseWindData(freqFrac, windSpdLabel);

  return windChartData
}


function processWindSpeeds(sourceData){
  const include_var = [ "wind_speed"]
  // Initialize the result object
  const windSpeed = {};

  sourceData.column_std_names
  .filter((variable) => include_var.includes(variable))
  .forEach((variable, index) => {
    const values = get_station_field_data(sourceData, variable, "column_std_names");

     // Store each instance of wind_speed with a unique name like "wind_speed_1", "wind_speed_2", etc.
     windSpeed[`${variable}_${index + 1}`] = values;

  });

  return windSpeed;
}

function parseWindData(freqFrac, windSpdLabel){
    const data = [];
    Object.entries(freqFrac).forEach(([key, points]) => {

        points.forEach((value, index)=> {
            data.push(
                {
                  cardinalPoint: key,
                    value: value,
                    windSpeedBin: windSpdLabel[index]
                }
            )
        })
    })

}


function generateChart(data){
    const config = {
        views: [
          {
            data,
            region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
            coordinate: { type: 'polar' },
            meta: {
              cardinalPoint: { alias: 'Cardinal-Point' },
              value: { alias: 'Value' },
            },
            tooltip: {
              showMarkers: false,
              shared: true,
            },
            geometries: [
              {
                type: 'interval',
                xField: 'cardinalPoint',
                yField: 'value',
                colorField: 'windSpeedBin',
                adjust: [{ type: 'stack' }],
              },
            ],
          },
        ],
      };

    return <Mix {...config} />;
}

