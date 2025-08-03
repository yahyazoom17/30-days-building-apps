import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

interface Props {
  data: { activity: string; hours: number; color: string }[];
}

const TimeChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((obj) => obj.activity),
    datasets: [
      {
        label: "Hours",
        data: data.map((obj) => obj.hours),
        backgroundColor: data.map((obj) => obj.color),
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default TimeChart;
