import { IPsychSession } from "@/types"
import { FC } from "react"
import styles from "./style.module.css";

interface Props {
    item: IPsychSession
}

const ScheduleItem: FC<Props> = ({ item }) => {
    const colors = ["#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F",]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className={styles.ScheduleItem}>
            <div className={styles.Time}>
                <h4>{new Date(item.dateSession).getHours()}:00</h4>
                <p>{new Date(item.dateSession).getHours() + 1}:00</p>
            </div>

            <div className={styles.Points}>
                <div className={styles.Point} style={{ background: randomColor }}><div /></div>
                <div className={styles.Line} style={{ background: randomColor }} />
            </div>

            <div className={styles.Box}>
                <div className={styles.Border} style={{ background: randomColor }} />

                <div className={styles.Group}>
                    <h3>{item.userName}</h3>
                    <p>{item.sessionNumber} сессия</p>
                </div>
            </div>
        </div>
    )
}

export default ScheduleItem