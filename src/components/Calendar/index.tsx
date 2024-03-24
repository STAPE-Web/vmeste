import { FC, useState } from "react";
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons";
import ButtonRound from "@/ui/Buttons/Round";

interface Props {
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

const Calendar: FC<Props> = ({ setSelectedDate }) => {
    const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const monthNames: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const [activeDay, setActiveDay] = useState(new Date().getDate())
    const [activeMonth, setActiveMonth] = useState(new Date().getMonth())

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
                    className={`${isActiveDay ? styles.ActiveDay : ''} ${activeDay === i ? styles.SelectedDay : ""}`}
                    onClick={() => selectDate(year, month, i)}
                >{i}</span>
            );
        }
        return daysArray;
    };

    function selectDate(year: number, month: number, i: number) {
        setActiveDay(i)
        const formatedDate = `${year}-${String(month).length !== 1 ? month + 1 : `0${month + 1}`}-${String(i).length !== 1 ? i : `0${i}`}`
        setSelectedDate(formatedDate)
    }

    return (
        <>
            <div className={styles.Weeks}>
                {week.map((item, index) => (<p key={index}>{item}</p>))}
            </div>

            <div className={styles.Calendar}>
                <div className={styles.Row}>
                    <ButtonRound big={true} disabled={activeMonth === new Date().getMonth()} onClick={() => {
                        setActiveMonth(activeMonth - 1)
                        setActiveDay(0)
                    }}><ArrowLeftIcon /></ButtonRound>
                    <div>
                        <h6>{new Date().getFullYear()}</h6>
                        <h3>{monthNames[activeMonth]}</h3>
                    </div>
                    <ButtonRound big={true} disabled={activeMonth === 11} onClick={() => {
                        setActiveMonth(activeMonth + 1)
                        setActiveDay(0)
                    }}><ArrowRightIcon /></ButtonRound>
                </div>
                <div className={styles.Days}>
                    {renderDays(activeMonth, new Date().getFullYear())}
                </div>
            </div>
        </>
    )
}

export default Calendar