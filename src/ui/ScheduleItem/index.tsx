import { IPsychSession } from "@/types";
import { FC } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
    item: IPsychSession & { isFree?: boolean };
}

const ScheduleItem: FC<Props> = ({ item }) => {
    const colors = ["#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F", "#92D35E", "#8C79FF", "#F8CB2F"];
    const navigate = useNavigate()
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className={styles.ScheduleItem}>
            <div className={styles.Time}>
                <h4>{new Date(item.dateSession).getHours()}:00</h4>
                <p>{new Date(item.dateSession).getHours() + 1}:00</p>
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
