import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#D6482B",
        borderRadius: 6,
        barThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          color: "#333",
          callback: (value) => value.toLocaleString(),
          stepSize: 1000,
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
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Monthly Total Payments Received",
        color: "#111",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { top: 10, bottom: 20 },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[400px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
