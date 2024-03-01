"use client"
import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LeftChart = () => {
  useEffect(() => {
    // Data for the chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Diff',
          data: [50, 30, 80, 40, 60],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'GR',
          data: [80, 50, 120, 60, 90],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'MES Offline',
          data: [120, 90, 150, 80, 110],
          backgroundColor: 'rgba(255, 255, 0, 0.5)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Get the canvas element
    const ctx = document.getElementById('leftChart');

    // Check if the chart already exists and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Create the new chart
    new Chart(ctx, config);
  }, []);

  return (
    <div className='col-span-2'>
      <canvas id="leftChart" width="400" height="200"></canvas>
    </div>
  );
};

export default LeftChart;