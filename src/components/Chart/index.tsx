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
import { getDay, parse } from "date-fns";

interface Props {
  array: { value: number; time: string }[];
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

  const daysOfMonth = [];
  for (let day = 1; day <= 31; day++) {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    daysOfMonth.push(`${formattedDay}.${month}`);
  }

  const labels = tab2 === "ДН" ? ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"]
    : tab2 === "НЕД" ? ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
      : tab2 === "МЕС" ? daysOfMonth
        : tab2 === "ГОД" ? ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
          : ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"]

  const chartData: number[] = Array(labels.length).fill(0);

  array.forEach((item) => {
    if (tab2 === "ДН") {
      const hour = item.time.split(" ")[1].split(":")[0];
      const labelHour = labels.findIndex((i) => i.split(":")[0] === hour);
      chartData[labelHour] = chartData[labelHour] ? (chartData[labelHour] + item.value) / 2 : item.value;
    }

    if (tab2 === "НЕД") {
      const [day, month, yearAndTime] = item.time.split('-');
      const [year, time] = yearAndTime.split(' ');
      const formattedDateStr = `${year}-${month}-${day} ${time.split('.')[0]}`;
      const date = parse(formattedDateStr, 'yyyy-MM-dd HH:mm:ss', new Date());
      let weekDay = getDay(date);
      weekDay = (weekDay + 6) % 7;
      chartData[weekDay] = chartData[weekDay] ? (chartData[weekDay] + item.value) / 2 : item.value;
    }

    if (tab2 === "ГОД") {
      const month = item.time.split(" ")[0].split("-")[1]
      const formatedMonth = month[0] === "0" ? Number(month[1]) - 1 : Number(month) - 1
      chartData[formatedMonth] = chartData[formatedMonth] ? (chartData[formatedMonth] + item.value) / 2 : item.value;
    }

    if (tab2 === "МЕС") {
      const day = item.time.split(" ")[0].split("-")[0]
      const dayIndex = Number(day) - 1
      chartData[dayIndex] = chartData[dayIndex] ? (chartData[dayIndex] + item.value) / 2 : item.value;
    }
  });

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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  function fillLabels() {
    switch (tab2) {
      case "ДН": return ["00:00", "", "", "", "04:00", "", "", "", "08:00", "", "", "", "12:00", "", "", "", "16:00", "", "", "", "20:00", "", "", "", "00:00"];
      case "НЕД": return ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
      case "ГОД": return ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
      case "МЕС": return [`01.${month}`, "", "", "", "", "", "", `08.${month}`, "", "", "", "", "", "", "", `16.${month}`, "", "", "", "", "", "", "", `24.${month}`, "", "", "", "", "", `30.${month}`,]
    }
  }

  const data = {
    labels: fillLabels(),
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
