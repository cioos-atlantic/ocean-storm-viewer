import { windSpeedBins, colorPalette, categorizeWindSpeed, makeEmptyfreqObj, extractWindSpeedBins } from "./wind_rose_utils";

const cardinalPoints = ["North", "N-E", "East", "S-E", "South", "S-W", "West", "N-W"];
export function categorizeWindDirection(direction, cardinalPoints) {
  
  const sectors = 360 / cardinalPoints.length;
  const index = Math.round(direction / sectors) % cardinalPoints.length;
  return cardinalPoints[index];
};


function calculateWindSpeedDistribution(direction, speeds, totalDataPoints) {

  const freqObj = makeEmptyfreqObj(windSpeedBins, cardinalPoints);

  const windSpdLabel = extractWindSpeedBins();
  const cardinal = categorizeWindDirection(direction, cardinalPoints);
  
  const speedBin = categorizeWindSpeed(speeds);
  console.log(cardinal, speedBin);
  
  const freqDist = {};

  for (let i = 0; i < cardinal.length; i++) {
    const dir = cardinal[i];
    const speed = speedBin[i];

    if (!freqDist[dir]) {
      freqDist[dir] = {};
    }

    if (!freqDist[dir][speed]) {
      freqDist[dir][speed] = 0;
    }

    freqDist[dir][speed]++;
  }

  console.log(freqDist);

  for (const [dir, bins] of Object.entries(freqDist)) {
    if (freqObj[dir]) {
      for (const [binStr, count] of Object.entries(bins)) {
        const binIndex = parseInt(binStr, 10) - 1;
        if (binIndex >= 0 && binIndex < freqObj[dir].length) {
          freqObj[dir][binIndex] = count;
        }
      }
    }
  }

  console.log(freqObj)
}

export function RenderPlotlyRose ( { windData, directionData, timeData }){
  const totalDataPoints= timeData.length;
  calculateWindSpeedDistribution(directionData, windData, totalDataPoints);

 
}