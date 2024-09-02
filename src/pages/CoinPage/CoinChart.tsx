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
  ChartOptions,
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

function CoinChart({ chartData, multiAxis, priceType, name }: { chartData: any; multiAxis: boolean; priceType: string; name?: string }) {
  const options: ChartOptions<"line"> = {
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
        title: {
          display: true,
          text: name, // Title for the first y-axis
          color: 'orange', // Title color
          font: {
            size: 11, // Title font size
          },
        },
        ticks: {
          callback: function (value: string | number) {
            if (priceType === 'prices')
              return '$' + value.toLocaleString();
            else {
              return '$' + convertPrice(Number(value));
            }
          },
        },
      },
      ...(multiAxis && {
        coin2: {
          position: "right",
          ticks: {
            callback: function (value: string | number) {
              if (priceType === 'prices')
                return '$' + value.toLocaleString();
              else {
                return '$' + convertPrice(value as number);
              }
            },
          },
        },
      }),
    },
  };

  return <Line data={chartData} options={options} />;
}

export default CoinChart;
