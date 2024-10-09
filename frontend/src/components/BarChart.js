import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import '../style/BarChart.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.range),
    datasets: [
      {
        label: "Items in Price Range",
        data: data.map((d) => d.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Range Bar Chart',
      },
    },
  };

  return (
    <div className="bar-chart">
      <h2>Price Range Bar Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;
