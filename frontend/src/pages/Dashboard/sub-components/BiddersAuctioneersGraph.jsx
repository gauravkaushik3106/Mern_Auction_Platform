import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#D6482B",
        backgroundColor: "rgba(214, 72, 43, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#fdba88",
        backgroundColor: "rgba(253, 186, 136, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333",
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        ticks: { color: "#333" },
        grid: { display: false },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bidders & Auctioneers Registered",
        color: "#111",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[400px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
