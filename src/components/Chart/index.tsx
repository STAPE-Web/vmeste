import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import styles from "./styles.module.css"
import { FC } from 'react';

interface Props {
    array: number[]
}

const Chart: FC<Props> = ({ array }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Filler,
    );

    const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        height: 150,
        scales: {
            y: {
                suggestedMax: 6,
                display: false,
                beginAtZero: true,
            },
            x: {
                ticks: {
                    color: '#BCBCBF',
                    font: {
                        size: 10,
                        family: 'Nunito'
                    }
                }
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                data: array,
                borderColor: '#FF8702',
                tension: 0.4,
                backgroundColor: function (context: any) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradientFill = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradientFill.addColorStop(1, 'rgba(252, 203, 148, 1)');
                    gradientFill.addColorStop(0, 'rgba(252, 203, 148, 0)');
                    return gradientFill;
                },
                pointRadius: 0
            },
        ],
    };

    return (
        <div className={styles.ChartBox} >
            <div className={styles.Labels}>
                {[1, 2, 3, 4, 5, 6].map((i) => (<div key={i}></div>))}
            </div>
            <Line options={options} data={data} className={styles.Chart} />
        </div>
    )
}

export default Chart;
