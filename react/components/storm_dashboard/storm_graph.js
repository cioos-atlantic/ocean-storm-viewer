import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineController} from 'chart.js';

//import { graph_colour } from './station_dashboard/station_graph/graph_config.js'

// Register necessary components, including the Line controller
Chart.register(LineController, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);


/**
 * Renders a line chart using Chart.js to display station data.
 */
function RenderStormChart({ sourceData,  varCategory, timeData }) {

  let chartTimeData = timeData;
  const chartRef = useRef(null); // Reference to the canvas element

  const startAtZero = varCategory === 'air_pressure' ? false : true

  useEffect(() => {
    // Check if chartData is available
    if (sourceData && sourceData.length > 0) {
      const ctx = chartRef.current.getContext('2d'); // Get context for the canvas
      const timeData = chartTimeData.map((timestamp) => new Date(timestamp).toLocaleString('en-US', {
        hour: '2-digit',
        //minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        //year: 'numeric'
    }));
    

    let datasets = [];
    datasets.push({
            label: `${varCategory}` , //  std_name if available
            data: sourceData || [], // Ensure that value exists
            borderColor:  getRandomColor(), // Generate random colors for each line
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fill: false,
          })

 
        
      // Chart.js configuration
      const chartConfig = {
        type: 'line',
        data: {
          labels: timeData, // Set the labels (time)
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
          spanGaps:true,
          //maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              fullSize: true,
              labels: {
                padding: 5,
                boxWidth: 10,
                font: {
                    size: 10,
                }
              }
              
            },
            title: {
              display: false,
              text: `Data for `,
            },

          },
        },
      };

      // Destroy the previous chart if it exists
      //console.log(chartRef.current.chart);
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new chart
      chartRef.current.chart = new Chart(ctx, chartConfig);
    }

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartRef?.current?.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [sourceData, varCategory, startAtZero]); // Re-run effect if chartData or stationName changes

  return (

      <canvas
        ref={chartRef}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          //height: '200px', // You can adjust this based on your needs
          maxWidth: 'auto',
          maxHeight: '200px', // You can keep this if you want to maintain responsiveness
          aspectRatio: '100 / 100', // Maintain a 1:1 aspect ratio if you want
        }}
      />

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

function getColour(graph_colour_list, var_name){
  let colour = '';
  console.log(var_name)
  console.log(graph_colour_list)
  colour = var_name in graph_colour_list ? graph_colour[var_name] : getRandomColor()
  return colour;
}


export default React.memo(RenderStormChart);

