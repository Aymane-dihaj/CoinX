import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function CoinChart({ chartData, multiAxis }: { chartData: any; multiAxis: boolean }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
      
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return <div className=" flex flex-col w-full justify-center"><Line data={chartData} options={options} /></div>;
}

export default CoinChart;
