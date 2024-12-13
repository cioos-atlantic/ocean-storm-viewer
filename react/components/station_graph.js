import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineController } from 'chart.js';
import { get_station_field_data, get_station_field_units, get_station_field_position } from './utils/station_data_format_util';
import { convert_unit_data, windSpeedToKmh, windSpeedToKnots } from './utils/unit_conversion';

// Register necessary components, including the Line controller
Chart.register(LineController, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);

const chartData ={
  column_std_names:{},
  units:{},
  rows:{}
}

function RenderChart({ sourceData, position, stationName, varCategory }) {
  const chartRef = useRef(null); // Reference to the canvas element

  const startAtZero = varCategory === 'air_pressure' ? false : true

  useEffect(() => {
    // Check if chartData is available
    if (sourceData && sourceData.rows.length > 0) {
      const ctx = chartRef.current.getContext('2d'); // Get context for the canvas
      // Make sure grabbing the most recent data
      chartData.units = sourceData.units
      chartData.column_std_names = sourceData.column_std_names
      // Plus one since end is not included
      chartData.rows = sourceData.rows //position > 30 ? sourceData.rows.slice(position-30, position+1) : sourceData.rows.slice(0, position+1)
      //chartData.rows = chartData.rows.length > 10 ? Data.rows.slice(Math.max(chartData.rows.length - 10, 0)) : chartData.rows

      const station_timeData = get_station_field_data(chartData,"time", "column_std_names")
      const timeData = station_timeData.map((timestamp) => new Date(timestamp).toLocaleString('en-US', {
                                hour: '2-digit',
                                //minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                //year: 'numeric'
      }));

      // Move this to config later
      const exclude_var = ['time', 'latitude', 'longitude', 'wind_from_direction', 'relative_humidity',
         'sea_surface_wave_from_direction', 'sea_surface_wave_maximum_period', 'sea_surface_wave_mean_period'
      ]
      // Prepare datasets for each variable, excluding 'time'
      const datasets = chartData.column_std_names.filter((variable) => !exclude_var.includes(variable) && variable.includes(varCategory)).map((variable, index) =>{
          const unit = get_station_field_units(sourceData, variable, "column_std_names")
          const values = get_station_field_data(chartData, variable, "column_std_names")

          return{
          label: `${variable} (${convert_unit_data(values[0], unit).unit})` || key, //  std_name if available
          data: values.map((value)=>convert_unit_data(value,unit).value) || [], // Ensure that value exists
          borderColor: getRandomColor(), // Generate random colors for each line
          backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
        };});

      // Chart.js configuration
      const chartConfig = {
        type: 'line',
        data: {
          labels: timeData, // Set the labels (time)
          datasets: datasets, // Set the datasets
        },
        options: {
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
          //maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: false,
              text: `Data for ${stationName}`,
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
  }, [sourceData, varCategory, stationName]); // Re-run effect if chartData or stationName changes

  return (
    
      <canvas
        ref={chartRef}
        style={{
          top: 0,
          left: 0,
          maxWidth: '200px',
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



export default React.memo(RenderChart);
