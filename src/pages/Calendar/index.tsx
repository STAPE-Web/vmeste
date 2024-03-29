import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { CloseIcon } from "@/ui/Icons"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SessionAPI } from "@/api"
import { ISession } from "@/types"

const Calendar = () => {
    const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const monthNames: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const [selectedDay, setSelectedDay] = useState(0)
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const navigate = useNavigate()
    const [data, setData] = useState<ISession[]>([])

    const daysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';

        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []);

    const getSession = useCallback(async () => {
        const result = await SessionAPI.get(sid)
        const allSessions: ISession[] = result.sessions.future
        setData(allSessions.filter(i => i.status !== "canceled"))
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const weeks = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        const dateParts = value.split(" ")[0].split("-");
        const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        const day = date.getDate();
        const month = date.getMonth();
        const weekDay = date.getDay();

        return `${weeks[weekDay]}, ${day} ${months[month]}`;
    }

    const renderDays = (month: number, year: number): JSX.Element[] => {
        const totalDays = daysInMonth(month, year);
        const currentDate = new Date();
        const daysArray: JSX.Element[] = [];
        for (let i = 1; i <= totalDays; i++) {
            const date = new Date(year, month, i);
            const isActiveDay = date.toDateString() === currentDate.toDateString();

            const appointment = data.find(appointment => {
                const appointmentDate = new Date(appointment.dateSession);
                return (
                    appointmentDate.getFullYear() === year &&
                    appointmentDate.getMonth() === month &&
                    appointmentDate.getDate() === i
                );
            });

            daysArray.push(
                <span
                    key={i}
                    className={`${isActiveDay ? styles.ActiveDay : ''} ${selectedDay === i ? styles.SelectedDay : ""}`}
                    onClick={() => setSelectedDay(selectedDay === i ? 0 : i)}
                >
                    {appointment && selectedDay === i && (
                        <div className={styles.SelectedBox}>
                            <img src={appointment.psychPhoto} alt="" />
                            <div>
                                <h3>{appointment.psychName}</h3>
                                <p>{appointment.sessionNumber} сессия, {appointment.price} ₽</p>
                                <h4>{formatDate(appointment.dateSession)}</h4>
                            </div>
                        </div>
                    )}
                    {i}
                    {appointment && <div className={styles.AppointmentIndicator}></div>}
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
                        <CloseIcon onClick={() => navigate(-1)} />
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