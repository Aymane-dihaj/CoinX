import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, Filler, Ticks } from 'chart.js';
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

function CoinChart({ chartData, multiAxis, priceType, name, name1 }: { chartData: any; multiAxis: boolean, priceType: string, name?: string, name1?: string }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis,
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
        title: {
          display: true,
          text: name, // Title for the first y-axis
          color: 'orange', // Title color
          font: {
            size: 11, // Title font size
          }
        },
        ticks:{
          callback: function(value: number) {
            if (priceType === 'prices')
                return '$' + value.toLocaleString()
            else{
              return '$' + convertPrice(value);
            }
          }
        }
      },
      coin2: multiAxis && {
        position: "right",
        ticks:{
          callback: function(value: number) {
            if (priceType === 'prices')
                return '$' + value.toLocaleString()
            else{
              return '$' + convertPrice(value);
            }
          }
        }
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default CoinChart;
