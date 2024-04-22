import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import styles from "./styles.module.css";
import { FC } from "react";

interface Props {
  array: { value: number; time: number }[];
  tab2: string
}

const Chart: FC<Props> = ({ array, tab2 }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
  );

  const month = `${String(new Date(Date.now()).getMonth()).length < 2 ? 0 : ""}${new Date(Date.now()).getMonth() + 1}`

  const labels = tab2 === "ДН" ? ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"]
    : tab2 === "НЕД" ? ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
      : tab2 === "МЕС" ? [`01.${month}`, `08.${month}`, `01.${month}`, `16.${month}`, `24.${month}`, `30.${month}`]
        : tab2 === "ГОД" ? ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
          : ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"]


  const chartData: number[] = Array(labels.length).fill(0);

  function findTimeInterval(time: number): [number, number] {
    for (let i = 0; i < labels.length - 1; i++) {
      const startTime = labels[i].split(":")[0];
      const endTime = labels[i + 1].split(":")[0];
      if (time >= Number(startTime) && time <= Number(endTime)) {
        return [i, i + 1];
      }
    }
    return [labels.length - 1, 0];
  }

  array.forEach((item: { value: number; time: number }) => {
    const [startIndex, endIndex] = findTimeInterval(item.time);
    const interpolatedValue: number = item.value / 2;
    if (startIndex === endIndex) {
      chartData[startIndex] = interpolatedValue;
    } else {
      chartData[startIndex] += interpolatedValue;
      chartData[endIndex] += interpolatedValue;
    }
  });

  console.log(chartData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: 150,
    scales: {
      y: {
        suggestedMax: 100,
        display: false,
        beginAtZero: true,
      },
      x: {
        ticks: {
          color: "#BCBCBF",
          font: {
            size: 10,
            family: "Nunito",
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: chartData,
        borderColor: "#FF8702",
        tension: 0.4,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradientFill = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradientFill.addColorStop(1, "rgba(252, 203, 148, 1)");
          gradientFill.addColorStop(0, "rgba(252, 203, 148, 0)");
          return gradientFill;
        },
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className={styles.ChartBox}>
      <div className={styles.Labels}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}></div>
        ))}
      </div>
      <Line options={options} data={data} className={styles.Chart} />
    </div>
  );
};

export default Chart;
