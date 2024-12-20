import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineController} from 'chart.js';
import { get_station_field_data, get_station_field_units, get_station_field_position, getColumnNameList, getUniqueStdNamesList } from './utils/station_data_format_util';
import { convert_unit_data, windSpeedToKmh, windSpeedToKnots } from './utils/unit_conversion';

// Register necessary components, including the Line controller
Chart.register(LineController, LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);


function RenderChart({ sourceData, position, stationName, varCategory }) {
  const chartRef = useRef(null); // Reference to the canvas element

  const startAtZero = varCategory === 'air_pressure' ? false : true

  useEffect(() => {
    // Check if chartData is available
    if (sourceData && sourceData.rows.length > 0) {
      const ctx = chartRef.current.getContext('2d'); // Get context for the canvas
      const chartData = parseChartData(sourceData, varCategory);
      console.log(chartData);
      const datasets = chartData.datasets;
      const timeData = chartData.timeData;
        
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
          //maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
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



export default React.memo(RenderChart);

function parseChartData(sourceData, varCategory){
  console.log(sourceData);
  const  column_names = sourceData.column_names;
  
  const column_std_names = sourceData.column_std_names;
  const uniqueColStdNames= getUniqueStdNamesList(column_std_names);
  console.log(uniqueColStdNames);

  const station_timeData = get_station_field_data(sourceData,"time", "column_std_names")?.data
  const timeData = station_timeData.map((timestamp) => new Date(timestamp).toLocaleString('en-US', {
                            //hour: '2-digit',
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
  const datasets = [];
  uniqueColStdNames.filter((variable) => !exclude_var.includes(variable) && variable.includes(varCategory)).map((variable, index) =>{
    console.log(variable)

    const column_names_list = getColumnNameList(column_std_names, column_names, variable)

    column_names_list.forEach(col_name => {
      const unit = get_station_field_units(sourceData, col_name)
      
      const data_obj = get_station_field_data(sourceData, col_name);
      console.log(data_obj)
      const values = data_obj?.data

      datasets.push({
      label: `${data_obj.long_name} (${convert_unit_data(values[0], unit).unit})` || key, //  std_name if available
      data: values.map((value)=>convert_unit_data(value,unit).value) || [], // Ensure that value exists
      borderColor: getRandomColor(), // Generate random colors for each line
      backgroundColor: 'rgba(0, 0, 0, 0)',
      fill: false,
      })
      
    });
    
  });
      console.log(datasets)
      return {datasets: datasets,
              timeData: timeData}
};