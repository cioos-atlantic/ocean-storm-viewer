import { windSpeedBins, colorPalette, categorizeWindSpeed, extractWindSpeedBins } from "./wind_rose_utils";

const cardinalPoints = ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"];
export function categorizeWindDirection(direction, cardinalPoints) {
  
  const sectors = 360 / cardinalPoints.length;
  const index = Math.round(direction / sectors) % cardinalPoints.length;
  //console.log(cardinalPoints[index])
  return cardinalPoints[index];
};


function calculateWindSpeedDistribution(directions, speeds, totalDataPoints) {
  console.log(windSpeedBins, cardinalPoints)
  const windSpdLabel = extractWindSpeedBins();

  const freqObj = makeEmptyfreqObj(windSpdLabel, cardinalPoints);
  //console.log(freqObj)

  
  const cardinal =  directions.map((direction)=> categorizeWindDirection(direction, cardinalPoints))
  const speedBin =  speeds.map((speed)=> categorizeWindSpeed(speed))
  
  
  console.log(cardinal, speedBin);
  
  const freqDist = {};

  for (let i = 0; i < cardinal.length; i++) {
    const dir = cardinal[i];
    const speed = speedBin[i];

    if (!freqDist[speed]) {
      freqDist[speed] = {};
    }

    if (!freqDist[speed][dir]) {
      freqDist[speed][dir] = 0;
    }

    freqDist[speed][dir]++;
  }

  console.log(freqDist);
  const freqFrac= structuredClone(freqObj);
  Object.keys(freqDist).forEach((speedBin)=>{

    Object.keys(freqDist[speedBin]).forEach((cardinalDirection)=>{
      const dirIdx= cardinalPoints.findIndex((point) => point === cardinalDirection);
      const freqPercent = ((freqDist[speedBin][cardinalDirection]/ totalDataPoints) * 100).toFixed(2);
      freqFrac[speedBin][dirIdx]= freqPercent;
    });
    
  });
  console.log(freqFrac)
  return freqFrac

  
}

export function makeEmptyfreqObj(windSpeedBins, cardinalPoints){
  const freqObj =  {};
  windSpeedBins.forEach((bin)=>{
    freqObj[bin] = new Array(cardinalPoints.length).fill(0);});
  
  console.log(freqObj);

  return freqObj
  
}

export function RenderPlotlyRose ( { windData, directionData, timeData }){
  const totalDataPoints= timeData.length;
  const data = calculateWindSpeedDistribution(directionData, windData, totalDataPoints);
  const var_data = [];
  Object.keys(data).forEach((speedBin, index)=>
  (
    var_data.push({
      r: data[speedBin],
      theta:cardinalPoints,
      name: speedBin,
      marker:colorPalette[index],
      type: "barpolar"
    })
  ));

  console.log(var_data);
  var layout = {

    title: {

      text: "Wind Speed Distribution in Laurel, NE"

    },

    font: {size: 16},

    legend: {font: {size: 16}},

    polar: {

      barmode: "overlay",

      bargap: 0,

      radialaxis: {ticksuffix: "%", angle: 45, dtick: 20},

      angularaxis: {direction: "clockwise"}

    }

  }


Plotly.newPlot("myDiv", data, layout)

 
}