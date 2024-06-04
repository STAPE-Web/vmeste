import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from "./style.module.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend
);

const BarChart: React.FC = () => {
    const data = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        datasets: [
            {
                label: 'Данные',
                data: [0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 10, 5],
                backgroundColor: (context: any) => {
                    const index = context.dataIndex;
                    return index === 11 ? 'orange' : 'rgba(0, 0, 0, 0.1)';
                },
                barThickness: 10,
                maxBarThickness: 10,
                borderRadius: {
                    topLeft: 10,
                    topRight: 10,
                },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        height: 250,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#BCBCBF",
                    font: {
                        size: 10,
                        family: "Nunito",
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                max: 20,
                ticks: {
                    color: "#23232B",
                    font: {
                        size: 10,
                        family: "Nunito",
                    },
                    callback: function (tickValue: string | number) {
                        if (typeof tickValue === 'number' && [0, 5, 10, 15, 20].includes(tickValue)) {
                            return tickValue;
                        }
                        return null;
                    },
                    stepSize: 5,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1,
                },
            },
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        }
    };

    return <Bar data={data} options={options} className={styles.BarChart} />;
};

export default BarChart;
