import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ButtonRound from "@/ui/Buttons/Round"
import { freeTime } from "./constants"
import ButtonDefault from "@/ui/Buttons/Default"
import { formatFreeTime } from "@/utils"
import { SessionAPI } from "@/api"

const AddSession = () => {
    const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const monthNames: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const [selectedDay, setSelectedDay] = useState(new Date().getDate())
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const navigate = useNavigate()
    const [activeMonth, setActiveMonth] = useState(new Date().getMonth())
    const [activeYear, setActiveYear] = useState(new Date().getFullYear())
    const [activeTime, setActiveTime] = useState<string[]>([])

    const goToPreviousMonth = () => {
        if (activeMonth === 0) {
            setActiveMonth(11);
            setActiveYear(activeYear - 1);
        } else {
            setActiveMonth(activeMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (activeMonth === 11) {
            setActiveMonth(0);
            setActiveYear(activeYear + 1);
        } else {
            setActiveMonth(activeMonth + 1);
        }
    };

    const daysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const scheduledDays: { [date: string]: boolean } = {}

    const renderDays = (month: number, year: number): JSX.Element[] => {
        const totalDays = daysInMonth(month, year);
        const currentDate = new Date();
        const daysArray: JSX.Element[] = [];
        for (let i = 1; i <= totalDays; i++) {
            const date = new Date(year, month, i);
            const isActiveDay = date.toDateString() === currentDate.toDateString();

            const dayString = i < 10 ? `0${i}` : `${i}`;
            const monthString = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
            const key = `${year}-${monthString}-${dayString}`;
            const isScheduled = scheduledDays[key];

            daysArray.push(
                <span
                    key={i}
                    className={`${isActiveDay ? styles.ActiveDay : ''} ${selectedDay === i ? styles.SelectedDay : ""} ${isScheduled ? styles.SheduledDay : ''}`}
                    onClick={() => setSelectedDay(i)}
                >
                    {i}
                </span>
            );
        }
        return daysArray;
    };

    function addFreeTime(time: string) {
        const formatDate = formatFreeTime(activeMonth, selectedDay, time, activeYear)

        if (activeTime.includes(formatDate)) {
            const newArray = activeTime.filter(i => i !== formatDate)
            setActiveTime(newArray)
        } else {
            setActiveTime(prev => [...prev, formatDate])
        }
    }

    async function addSession() {
        const result = await SessionAPI.add(sid, activeTime)
        console.log(result)
        if (result.status === 200) {

        } else {
            alert(result.msg)
        }
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h2>Записать на сессию</h2>
                    <InfoIcon />
                </div>

                <div className={styles.Weeks}>
                    {week.map((item, index) => (<p key={index}>{item}</p>))}
                </div>

                <div className={styles.Calendar}>
                    <div className={styles.Data}>
                        <div>
                            <h6>{activeYear}</h6>
                            <h3>{monthNames[activeMonth]}</h3>
                        </div>

                        <div className={styles.Arrows}>
                            <ButtonRound big={false} disabled={false} onClick={() => goToPreviousMonth()}><ArrowLeftIcon /></ButtonRound>
                            <ButtonRound big={false} disabled={false} onClick={() => goToNextMonth()}><ArrowRightIcon /></ButtonRound>
                        </div>
                    </div>
                    <div className={styles.Days}>
                        {renderDays(activeMonth, activeYear)}
                    </div>
                </div>

                <div className={styles.FreeTime}>
                    <h3>Выбор свободного времени</h3>

                    {freeTime.map((item, index) => (
                        <div key={index} className={styles.FreeItem}>
                            <p>{item.title}</p>
                            <div className={styles.Row}>
                                {item.array.map((item, i) => (
                                    <div key={i} className={`${activeTime.some(i => i === formatFreeTime(activeMonth, selectedDay, item, activeYear)) ? styles.Active : ""}`} onClick={() => addFreeTime(item)}>{item}</div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <ButtonDefault disabled={activeTime.length === 0} onClick={() => addSession()}>Назначить сессию</ButtonDefault>
                </div>
            </section>
        </main>
    )
}

export default AddSession