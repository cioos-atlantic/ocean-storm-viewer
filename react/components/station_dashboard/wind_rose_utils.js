import React, { useEffect, useRef, useState, useMemo } from 'react';
import { get_station_field_data, get_station_field_units } from '../utils/station_data_format_util';

export const windSpeedBins = [
  { min: 0, max: 8, label: "=< 8 m/s" },
  { min: 8, max: 16, label: "9-16 m/s" },
  { min: 16, max: 24, label: "17-24 m/s" },
  { min: 24, max: 32, label: "25-32 m/s" },
  { min: 32, max: 40, label: "33-40 m/s" },
  { min: 40, max: 48, label: "41-48 m/s" },
  { min: 48, max: 56, label: "49-56 m/s" },
  { min: 56, max: 64, label: "57-64 m/s" },
  { min: 64, max: undefined, label: ">= 65 m/s" },

];
export const colorPalette= [
  '#5E4FA2', // Deep Purple
'#3288BD', // Blue
'#66C2A5', // Teal
'#ABDDA4', // Light Green
'#E6F598', // Yellow-Green
'#FEE08B', // Yellow
'#FDAE61', // Orange
'#F46D43', // Red-Orange
'#D53E4F', // Deep Red
];

export const cardinalPoints = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];



export function categorizeWindDirection(direction) {
  const cardinalPoints = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const sectors = 360 / cardinalPoints.length;
  const index = Math.round(direction / sectors) % cardinalPoints.length;
  return cardinalPoints[index];
}

export function categorizeWindSpeed(speed) {
  for (const bin of windSpeedBins) {
    if (speed >= bin.min && (bin.max === undefined || speed < bin.max)) {
      return bin.label; // Return the label instead of the index
    }
  }
  return "Unknown"; // For speeds that don't match any bin
}



export function makeEmptyfreqObj(windSpeedBins, cardinalPoints){
  const freqObj =  {};
  cardinalPoints.forEach((point)=>{
    freqObj[point] = new Array(windSpeedBins.length).fill(0);});
  
  console.log(freqObj);

  return freqObj
  
}

export function makeFreqFraction(freqObj, totalDataPoints){
  console.log(totalDataPoints)
  const freqFrac= structuredClone(freqObj);

  Object.values(freqFrac).forEach((point) =>{
    //console.log(point)


    point.forEach((value, index) => {
      
      point[index] = (value / totalDataPoints) * 100

    });
  });

  //console.log(freqFrac);
  return freqFrac
};

export function extractWindSpeedBins(){
  const windSpdLabel= []
    
    windSpeedBins.forEach((obj) =>
      {windSpdLabel.push(obj.label)})

    return windSpdLabel
};

export function makeGroupedList(directions, speeds){
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

export function processWindSpeeds(sourceData){
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
  
export function parseWindData(freqFrac, windSpdLabel){
    const data = [];
    Object.entries(freqFrac).forEach(([key, points]) => {

        points.forEach((value, index)=> {
            data.push(
                {
                direction: key,
                    value: value,
                    windSpeedBin: windSpdLabel[index]
                }
            )
        })
    });
    //console.log(data)
    return data;

}

function ChartComponent({ data, chartKey }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = new Chart({
      container: chartContainerRef.current});
    chart.options({
      type: "interval",
      title:{
        title: chartKey,
      },
      autoFit: true,
      height: 300,
      padding: 40,
      data: data,
      encode: { x: "direction", y: "value", color: "windSpeedBin", size: 18 },
      transform: [{ type: "stackY" }],
      scale: {
          color: {
          range: colorPalette,
          },
      },
      coordinate: { type: "polar" },
      axis: {
          x: { line: true, grid: true, gridLineDash: [0, 0], gridLineWidth: 1 },
          y: { title: false, line: true, gridLineWidth: 1 },
      },
      tooltip: {
          title: (d) => d.direction,
          items: [
          (d, i, data, column) => ({
              name: d.windSpeedBin,
              value: d.value,
              channel: "y",
          }),
          ],
      },
      interaction: { tooltip: { shared: true } },
      });
    chart.render();

    return () => chart.destroy(); // Cleanup on unmount
  }, [data]);

  return <div id={`chart-${chartKey}`} ref={chartContainerRef} className="chart-container" />;
}