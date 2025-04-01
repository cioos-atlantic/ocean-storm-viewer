import React, { useEffect, useRef } from 'react';
import { Chart, PolarAreaController, RadialLinearScale, ArcElement, Legend, Title } from 'chart.js';
import { storm_categories } from '@/lib/storm_class';

// Register necessary components
Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Legend, Title);



function StormCategoryChart({ chartData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartData || !chartData.data) return;

    const uniqueStormCats = [...new Set(chartData.data)];
    
    
    // Extract background colors based on storm types
    const labels = uniqueStormCats.map(category => storm_categories[category]?.name.en || 'No Data');
    const backgroundColors = uniqueStormCats.map(category => 
      storm_categories[category]?.arcColor || "#CCCCCC" // Default color if type is missing
    );

    const data = {
      labels: labels,
      datasets: [
        {
          label: chartData.name,
          data: uniqueStormCats.map(type => chartData.data.filter(t => t === type).length), // Count occurrences,
          backgroundColor: backgroundColors,
        },
      ],
    };

    // Chart configuration
    const config = {
      type: 'polarArea',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Storm Category Distribution' },
        },
      },
    };

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(chartRef.current, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div style={{ width: "400px", height: "400px" }}> {/* Set container size */}
      <canvas ref={chartRef} id="stormCategoryChart" width="400" height="400"></canvas> {/* Set explicit canvas size */}
    </div>
  );
}

export default StormCategoryChart;



function getLabelName(name_code){
  const labelName = storm_type_info[name_code]['name']['en']
  return labelName
}