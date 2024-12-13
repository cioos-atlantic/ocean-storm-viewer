import React, { useEffect, useRef, useState, useMemo } from 'react';
import { get_station_field_data, get_station_field_units } from '../utils/station_data_format_util';
import { Chart } from "@antv/g2";
import { categorizeWindDirection, categorizeWindSpeed, makeEmptyfreqObj, makeFreqFraction, makeGroupedList, extractWindSpeedBins, processWindSpeeds, parseWindData, windSpeedBins, cardinalPoints, colorPalette } from './wind_rose_utils';


export function RenderWindRose ( { sourceData, setHasWindRoseData, hasWindRoseData }){
  
  const chartContainerRef = useRef(null);
  useEffect(() => {
    // Check if container ref exists
    const container = chartContainerRef.current;
    if (!container) return;

//const [chartData, setChartData] = useState(null);
    console.log(sourceData)
    const stationDirData = get_station_field_data(sourceData, 'wind_from_direction', "column_std_names");
    console.log(stationDirData)
    if (!stationDirData || stationDirData.every(item => item === undefined)) {
        console.log("stationDirData returned an array of undefined values");
        setHasWindRoseData(false)
        return; // Exit early
    }

    setHasWindRoseData(true)
    const windSpeeds = processWindSpeeds(sourceData);
    console.log(windSpeeds)
    const unit = get_station_field_units(sourceData,"wind_speed", "column_std_names");
    const station_timeData = get_station_field_data(sourceData, "time", "column_std_names");
    const totalDataPoints= station_timeData.length;
      console.log(totalDataPoints);
      //generateChartOption(windSpeeds, stationDirData, totalDataPoints)

      //return Object.entries(windSpeeds).map(([key, windSpeed]) => {
      //  const windChartData = calculateWindSpeedDistribution(stationDirData, windSpeed, totalDataPoints);
      //  return <ChartComponent key={key} data={windChartData} chartKey={key} />;
      //});  
    const chartOptions = generateChartOption(windSpeeds, stationDirData, totalDataPoints);
    renderChart(chartOptions)  

    return () => {
      while (container.firstChild) {
        container.firstChild.remove();
      }
    };
    
      
  }, [sourceData, setHasWindRoseData]);
  // Add a container div for all charts

  return (
    <div>
      {!hasWindRoseData ? (
        <div>No data available</div>
      ) : (
        <div id="container" ref={chartContainerRef} />
      )}
    </div>
  );
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



function generateChartOption(windSpeeds, stationDirData, totalDataPoints){
  const chartOption = [];
  Object.entries(windSpeeds).map(([key, windSpeed]) => {
    const windChartData = calculateWindSpeedDistribution(stationDirData, windSpeed, totalDataPoints);
    chartOption.push({
      type: "interval",
      title:key,
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
  console.log(chartOption);
  return chartOption
}

function renderChart(chartOptions) {
  if (chartOptions){
    const chart = new Chart({ container: "container" });

    chart.options({
      type: "spaceFlex",
      width: 800,
      height: 250,
      children: chartOptions,
    });

    chart.render();
  }
}
