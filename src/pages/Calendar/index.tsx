import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/ui/Icons"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { PshycologistsAPI, SessionAPI } from "@/api"
import { ISession, ISpecialist } from "@/types"
import ButtonDefault from "@/ui/Buttons/Default"
import ButtonRound from "@/ui/Buttons/Round"

const Calendar = () => {
    const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const monthNames: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const [selectedDay, setSelectedDay] = useState(0)
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const navigate = useNavigate()
    const [data, setData] = useState<ISession[]>([])
    const [psyhData, setPsyhData] = useState<ISpecialist | null>(null)
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const pid = searchParams.get("pid")
    const [newDate, setNewDate] = useState("")
    const [newResultDate, setNewResultDate] = useState("")
    const [activeMonth, setActiveMonth] = useState(new Date().getMonth())
    const [activeYear, setActiveYear] = useState(new Date().getFullYear())

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

    const getSession = useCallback(async () => {
        const result = await SessionAPI.get(sid)
        const allSessions: ISession[] = result.sessions.future
        setData(allSessions.filter(i => i.status !== "canceled"))
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    const getSpecialist = useCallback(async () => {
        const result = await PshycologistsAPI.get(sid, { familyTherapy: true, gender: "M", prices: [2500, 3500, 4500], themes: ["Стресс"] })
        const userData = result.psychologists.find((i: ISpecialist) => i.id === pid)
        setPsyhData(userData)
    }, [sid, id])

    useEffect(() => {
        getSpecialist()
    }, [getSpecialist])

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

    const scheduledDays: { [date: string]: boolean } = psyhData ? psyhData?.freeTime?.reduce((acc: { [date: string]: boolean }, dateString: string) => {
        const date = dateString.split(" ")[0];
        acc[date] = true;
        return acc;
    }, {}) : {};

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
            const dayString = i < 10 ? `0${i}` : `${i}`;
            const monthString = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
            const key = `${year}-${monthString}-${dayString}`;
            const isScheduled = scheduledDays[key];

            daysArray.push(
                <span
                    key={i}
                    className={`${isActiveDay ? styles.ActiveDay : ''} ${selectedDay === i ? styles.SelectedDay : ""} ${isScheduled ? styles.SheduledDay : ''}`}
                    onClick={() => {
                        if (id) {
                            if (isScheduled) selectDate(year, month, i)
                        } else {
                            setSelectedDay(selectedDay === i ? 0 : i)
                        }
                    }}
                >
                    {newDate !== "" && Number(newDate.split("-")[2]) === Number(String(i).length !== 1 ? i : `0${i}`) && (<div className={styles.NewDateBox}>
                        <div className={styles.NewTime}>
                            {psyhData?.freeTime.filter(pitem => pitem.split(" ")[0] === newDate).map((pitem, piid) => (
                                <div
                                    onClick={() => setNewResultDate(pitem)}
                                    key={piid}
                                    className={newResultDate === pitem ? styles.ActiveNewTime : ""}
                                >{pitem.split(" ")[1].split(":")[0]}:{pitem.split(" ")[1].split(":")[1]}</div>
                            ))}
                        </div>
                    </div>)}
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
                    {!id && appointment && <div className={styles.AppointmentIndicator}></div>}
                </span>
            );
        }
        return daysArray;
    };

    function selectDate(year: number, month: number, i: number) {
        const formatedDate = `${year}-${String(month).length !== 1 ? month + 1 : `0${month + 1}`}-${String(i).length !== 1 ? i : `0${i}`}`
        setNewDate(formatedDate)
    }

    async function carrySession() {
        const apiData = {
            sid: sid,
            sesId: id,
            newTime: newResultDate
        }
        const result = await SessionAPI.move(apiData)
        console.log(result)
        setNewDate("")
        setNewResultDate("")
        getSession()
        getSpecialist()
        alert("Сессия успешно перенесена")
    }

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

                    {id && <ButtonDefault disabled={newResultDate === ""} onClick={() => carrySession()}>Перенести сессию</ButtonDefault>}
                </div>
            </section>
        </main>
    )
}

export default Calendar