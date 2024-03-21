import { useState } from "react";
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons";
import ButtonRound from "@/ui/Buttons/Round";

const Calendar = () => {
    const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const monthNames: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    // const [selectedDay, setSelectedDay] = useState(0)
    const [activeMonth, setActiveMonth] = useState(new Date().getMonth())
    // console.log(activeMonth)

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
                    className={`${isActiveDay ? styles.ActiveDay : ''}`}
                    onClick={() => ({})}
                >{i}</span>
            );
        }
        return daysArray;
    };

    return (
        <>
            <div className={styles.Weeks}>
                {week.map((item, index) => (<p key={index}>{item}</p>))}
            </div>

            <div className={styles.Calendar}>
                <div className={styles.Row}>
                    <ButtonRound big={true} disabled={activeMonth === new Date().getMonth()} onClick={() => setActiveMonth(activeMonth - 1)}><ArrowLeftIcon /></ButtonRound>
                    <div>
                        <h6>{new Date().getFullYear()}</h6>
                        <h3>{monthNames[activeMonth]}</h3>
                    </div>
                    <ButtonRound big={true} disabled={activeMonth === 11} onClick={() => setActiveMonth(activeMonth + 1)}><ArrowRightIcon /></ButtonRound>
                </div>
                <div className={styles.Days}>
                    {renderDays(activeMonth, new Date().getFullYear())}
                </div>
            </div>
        </>
    )
}

export default Calendar