import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { convertPrice } from "../../utils/convertPrice";

// Register the Filler plugin
Chart.register(Filler);

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function CoinChart({ chartData, multiAxis, name, name2}: { chartData: any; multiAxis: boolean; name?: string, name1?: string}) {
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
    scales: {
      coin1: {
        position: "left",
      },
      coin2: multiAxis && {
        position: "right",
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default CoinChart;
