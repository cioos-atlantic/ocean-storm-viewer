import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineController } from 'chart.js';
import { get_station_field_data, get_station_field_units } from './utils/station_data_util';
import { convert_unit_data, windSpeedToKmh, windSpeedToKnots } from './utils/unit_conversion';

// Register necessary components, including the Line controller
Chart.register(LineController, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);

function RenderChart({ chartData, stationName }) {
  console.log(chartData)
  const chartRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    // Check if chartData is available
    if (chartData && chartData.rows.length > 0) {
      const ctx = chartRef.current.getContext('2d'); // Get context for the canvas
      // Make sure grabbing the most recent data
      chartData.rows = chartData.rows.length > 10 ? chartData.rows.slice(Math.max(chartData.rows.length - 10, 0)) : chartData.rows

      const station_timeData = get_station_field_data(chartData, "time", "column_std_names")
      const timeData = station_timeData.map((timestamp) => new Date(timestamp).toLocaleString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                //day: '2-digit',
                                //month: '2-digit',
                                //year: 'numeric'
      }));

      const exclude_var = ['time', 'latitude', 'longitude', 'wind_from_direction', 'air_pressure', 'relative_humidity',
        'air_temperature', 'sea_surface_temperature', 'sea_surface_wave_from_direction'
      ]
      // Prepare datasets for each variable, excluding 'time'
      const datasets = chartData.column_std_names.filter((variable) => !exclude_var.includes(variable)).map((variable, index) =>{
         // Exclude 'time' from datasets
          const unit = get_station_field_units(chartData, variable, "column_std_names")
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
              beginAtZero: true,
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
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new chart
      chartRef.current.chart = new Chart(ctx, chartConfig);
    }

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [chartData, stationName]); // Re-run effect if chartData or stationName changes

  return (
    
      <canvas
        ref={chartRef}
        style={{
          top: 0,
          left: 0,
          width: '500px',
          height: '300px', // You can keep this if you want to maintain responsiveness
          aspectRatio: '409 / 409', // Maintain a 1:1 aspect ratio if you want
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
