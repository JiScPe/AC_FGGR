"use client";
import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

function RightChart() {
  useEffect(() => {
    // Data for the chart
    const data = {
      labels: ["Loc 1", "Loc 2", "Loc 3"],
      datasets: [
        {
          data: [3330, 6589, 500],
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 255, 0, 0.5)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 255, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const config = {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = data.labels[context.dataIndex];
                const value = data.datasets[0].data[context.dataIndex];
                return `${label}: ${value}%`;
              },
            },
          },
        },
      },
    };

    // Get the canvas element
    const ctx = document.getElementById("rightChart");

    // Check if the chart already exists and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    // Create the new chart
    new Chart(ctx, config);
  }, []);
  return (
    <div className="col-span-2">
      <canvas id="rightChart" width="400" height="200"></canvas>
    </div>
  );
}

export default RightChart;
