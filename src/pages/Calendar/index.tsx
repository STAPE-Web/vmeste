import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { CloseIcon } from "@/ui/Icons"
import { useState } from "react"
import Avatar from "@/assets/Avatar2.png"
import { useNavigate } from "react-router-dom"

const Calendar = () => {
    const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const monthNames: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const [selectedDay, setSelectedDay] = useState(0)
    const navigate = useNavigate()

    const daysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderDays = (month: number, year: number): JSX.Element[] => {
        const totalDays = daysInMonth(month, year);
        const currentDate = new Date();
        const daysArray: JSX.Element[] = [];
        for (let i = 1; i <= totalDays; i++) {
            const date = new Date(year, month, i);
            const isActiveDay = date.toDateString() === currentDate.toDateString();
            daysArray.push(
                <span
                    key={i}
                    className={`${isActiveDay ? styles.ActiveDay : ''} ${selectedDay === i ? styles.SelectedDay : ""}`}
                    onClick={() => setSelectedDay(i)}
                >
                    {selectedDay === i && <div className={styles.SelectedBox}>
                        <img src={Avatar} alt="" />
                        <div>
                            <h3>Ольга Кузнецова</h3>
                            <p>1 сессия, 2 500 ₽</p>
                            <h4>30 ноября 2023, 16:00</h4>
                        </div>
                    </div>}
                    {i}
                </span>
            );
        }
        return daysArray;
    };

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <CloseIcon onClick={() => navigate("/sessions")} />
                        <p>Сегодня</p>
                    </div>

                    <div className={styles.Weeks}>
                        {week.map((item, index) => (<p key={index}>{item}</p>))}
                    </div>

                    <div className={styles.Calendar}>
                        <h6>{new Date().getFullYear()}</h6>
                        <h3>{monthNames[new Date().getMonth()]}</h3>
                        <div className={styles.Days}>
                            {renderDays(new Date().getMonth(), new Date().getFullYear())}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Calendar