import { IPsychSession } from "@/types";
import { FC } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
    item: IPsychSession & { isFree?: boolean };
}

const ScheduleItem: FC<Props> = ({ item }) => {
    const colors = ["#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F"];
    const navigate = useNavigate();
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    let dateSession = new Date(item.dateSession);

    // Check if the date is invalid
    if (isNaN(dateSession.getTime())) {
        // Try to parse it manually if it is in an incorrect format
        const [datePart, timePart] = item.dateSession.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        dateSession = new Date(year, month - 1, day, hours, minutes, seconds);
    }

    // If still invalid, set to default value
    if (isNaN(dateSession.getTime())) {
        dateSession = new Date(); // Current date as fallback
    }

    const hours = dateSession.getHours();
    const nextHour = (hours + 1) % 24;

    return (
        <div className={styles.ScheduleItem}>
            <div className={styles.Time}>
                <h4>{String(hours).padStart(2, '0')}:00</h4>
                <p>{String(nextHour).padStart(2, '0')}:00</p>
            </div>

            <div className={styles.Points}>
                <div className={styles.Point} style={{ background: item.isFree ? "#E8E8E8" : randomColor }}><div /></div>
                <div className={styles.Line} style={{ background: item.isFree ? "#E8E8E8" : randomColor }} />
            </div>

            <div className={styles.Box} onClick={() => !item.isFree && navigate(`/session/${item.sesId}`)}>
                <div className={styles.Border} style={{ background: item.isFree ? "#E8E8E8" : randomColor }} />

                <div className={styles.Group}>
                    {item.isFree ? (
                        <h3 style={{ color: "#98A1AA" }}>Сессия пока не назначена</h3>
                    ) : (
                        <>
                            <h3>{item.userName}</h3>
                            <p>{item.sessionNumber} сессия</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduleItem;
