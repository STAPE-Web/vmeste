import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    max: number
    value: number
}

const StepLine: FC<Props> = ({ max, value }) => {
    const progress = (value / max) * 100;

    return (
        <div className={styles.StepLine}>
            <div className={styles.Range}>
                <div style={{ width: `${progress}%` }}></div>
            </div>

            <p>{value}/{max}</p>
        </div>
    )
}

export default StepLine