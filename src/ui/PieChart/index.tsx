import React, { FC } from "react";
import styles from "./style.module.css";

interface Props {
    value: number;
}

const PieChart: FC<Props> = ({ value }) => {
    const size = 90;
    const innerRadius = size / 2 - 5;

    return (
        <div
            className={styles.circleBorder}
            style={{ '--size': `${size}px` } as React.CSSProperties}
        >
            <div className={styles.progressText}>{value}%</div>
            <svg width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={innerRadius}
                    fill="transparent"
                    stroke="#FF8702"
                    strokeWidth="10"
                    strokeDasharray={`${(2 * Math.PI * innerRadius * value) / 100}, ${2 * Math.PI * innerRadius}`} // Длина границы, отображающей процент
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
        </div>
    );
};

export default PieChart;
