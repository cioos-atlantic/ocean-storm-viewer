import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineController, BarController, BarElement, Filler } from 'chart.js';
import { storm_graph_color, } from './storm_color';
import { keyframes } from '@emotion/react';

//import { graph_colour } from './station_dashboard/station_graph/graph_config.js'




// Register necessary components, including the Line controller
Chart.register(LineController, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, BarController, BarElement, Filler  );


/**
 * Renders a line chart using Chart.js to display station data.
 */
function RenderStormChart({ sourceData,  varCategory, timeData, hoverPointTime }) {
  console.log(sourceData);
  

  let chartTimeData = timeData;
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Store Chart.js instance

  const startAtZero = varCategory === 'stormPressure' ? false : true

  const highlightTime = new Date(hoverPointTime).toLocaleString('en-US', {
    hour: '2-digit',
    day: '2-digit',
    month: '2-digit',

  });

// Find the index of the given time dynamically
//const highlightIndex = chartTimeData.indexOf(highlightTime);

  const formattedTimeData = chartTimeData.map((timestamp) => new Date(timestamp).toLocaleString('en-US', {
  hour: '2-digit',
  //minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  //year: 'numeric'
  }));

  useEffect(() => {
    // Check if chartData is available
    if (sourceData) {
      const ctx = chartRef.current.getContext('2d'); // Get context for the canvas
      
    
      console.log(sourceData);
      const datasets = makeDataset(sourceData, formattedTimeData, highlightTime);

      console.log(datasets);
    

      
        
      // Chart.js configuration
      const chartConfig = {
        type: 'line',
        data: {
          labels: formattedTimeData, // Set the labels (time)
          datasets: datasets, // Set the datasets
        },
        
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales: {
            x: {
              grid: {
                display: true, // Show grid on the x-axis
              },
            },
            y: {
              grid: {
                display: true, // Show grid on the y-axis
              },
              beginAtZero: startAtZero,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          spanGaps:true,
          //maintainAspectRatio: false,
          plugins: {
            filler: {
              propagate: false,
            },
            legend: {
              position: 'right',
              fullSize: true,
              labels: {
                padding: 5,
                boxWidth: 10,
                font: {
                    size: 10,
                }
              },
              
            },

            
          },
          
        },
      };

     

      // Create a new chart
      chartInstance.current = new Chart(ctx, chartConfig);
    }

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [sourceData, varCategory, startAtZero, hoverPointTime]); // Re-run effect if chartData or stationName changes


  console.log("here")
  return (

    <div  style={{position: 'relative', width:'100%', display:'flex ', justifyContent: 'center' }}>
    <canvas
      ref={chartRef}
      style={{
        top: 0,
        left: 0,
        
      }}
    />
  </div>

  );
}

// Function to generate a random color for chart lines
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function getColour(var_name){
  let colour = '';
  console.log(var_name)
  console.log(storm_graph_color)
  colour = storm_graph_color[var_name] || getRandomColor();
  return colour;
}




//Generate datasets
function makeDataset(dataList, formattedTimeData, highlightTime) {
  const datasets=[];
  dataList.forEach((dataDict) => {console.log(dataDict);
    Object.entries(dataDict).forEach(([key, value]) => {console.log(key)
      datasets.push({
        label: value.name,
        data: value.data,
        borderColor: getColour(value.name),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: true,
        pointRadius: (context) => (formattedTimeData[context.dataIndex] === highlightTime ? 10 : 0),
        pointBackgroundColor: (context) => (formattedTimeData[context.dataIndex] === highlightTime ? 'red' : 'blue'),
      })

    })

    })
    


  

  console.log(datasets);
  return datasets;
}




export default React.memo(RenderStormChart);