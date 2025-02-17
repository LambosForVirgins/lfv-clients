import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the shape of our price data
type PriceDataPoint = [number, number];

interface LineChartProps extends Common.ComponentProps {
  data: PriceDataPoint[];
}

const ANIMATION_DURATION = 500; // milliseconds
const SMOOTHING_FACTOR = 0.4; // smooths the line

const options: ChartOptions<"line"> = {
  responsive: true,
  animation: {
    duration: ANIMATION_DURATION,
  },
  plugins: { legend: { display: false } },
  scales: {
    x: {
      display: false,
      title: {
        display: false,
        text: "Time",
      },
    },
    y: {
      display: false,
      title: {
        display: false,
        text: "Price",
      },
    },
  },
};

export const LineChart = ({ testID, ...props }: LineChartProps) => {
  const chartData = useMemo(
    () => ({
      labels: props.data.map((point) => point[0]),
      datasets: [
        {
          label: "Price",
          data: props.data.map((point) => point[1]),
          fill: false,
          borderColor: "#21E56F",
          tension: SMOOTHING_FACTOR,
        },
      ],
    }),
    [props.data]
  );

  return <Line data={chartData} options={options} />;
};
