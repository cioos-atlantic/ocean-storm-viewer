import React, { useEffect, useRef, useState, useMemo } from 'react';
import { get_station_field_data, get_station_field_units } from '../utils/station_data_format_util';
import { Mix } from '@ant-design/charts';
import { Chart } from "@antv/g2";


const windSpeedBins = [
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
const colorPalette= [
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

const cardinalPoints = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];

export function RenderWindRose ( { sourceData }){
    const charts = useMemo(() => {

    //const [chartData, setChartData] = useState(null);
    console.log(sourceData)
        const stationDirData = get_station_field_data(sourceData, 'wind_from_direction', "column_std_names");
        console.log(stationDirData)
        if (!stationDirData || stationDirData.every(item => item === undefined)) {
            console.log("stationDirData returned an array of undefined values");
            return; // Exit early
        }

        const windSpeeds = processWindSpeeds(sourceData);
        console.log(windSpeeds)
        const unit = get_station_field_units(sourceData,"wind_speed", "column_std_names");
        const station_timeData = get_station_field_data(sourceData, "time", "column_std_names");
        const totalDataPoints= station_timeData.length;
          console.log(totalDataPoints);
    
          return Object.entries(windSpeeds).map(([key, windSpeed]) => {
            const windChartData = calculateWindSpeedDistribution(stationDirData, windSpeed, totalDataPoints);
            return <ChartComponent key={key} data={windChartData} chartKey={key} />;
          });    
          
      }, [sourceData]);
      // Add a container div for all charts
    return <div id="charts-container" style={{ display: 'flex', flexWrap: 'wrap' }}>{charts}</div>;
}




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
    //console.log(point)


    point.forEach((value, index) => {
      
      point[index] = (value / totalDataPoints) * 100

    });
  });

  //console.log(freqFrac);
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
  console.log(freqFrac)

  const windChartData = parseWindData(freqFrac, windSpdLabel);
  console.log(windChartData)

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



function generateChartOption(windSpeeds, stationDirData, totalDataPoints){
  const chartOption = [];
  Object.entries(windSpeeds).map(([key, windSpeed]) => {
    const windChartData = calculateWindSpeedDistribution(stationDirData, windSpeed, totalDataPoints);
    chartOption.push({
      type: "interval",
      title:{
        title: key,
      },
      autoFit: true,
      height: 300,
      padding: 40,
      data: windChartData,
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
      })
    
  });
}