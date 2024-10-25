import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowRightIcon, Calendar2Icon, CheckIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { PshycologistsAPI, SessionAPI } from "@/api"
import { IPsychSession, IPsychSessions, ISession } from "@/types"
import PsychSidebar from "@/components/PsyhSidebar"
import useGlobalStore from "@/store"

const Sessions = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState("Планируемые")
    const tabs = ["Планируемые", "Прошедшие"]
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const userType = localStorage.getItem("userType")

    const [futureSessions, setFutureSessions] = useState<ISession[]>([])
    const [lastSessions, setLastSessions] = useState<ISession[]>([])
    const [psychSession, setPsychSession] = useState<IPsychSession[]>([])
    const filteredPsychSessions = psychSession.filter(i => i.status === "pending")
    const endedSessions = psychSession.filter(i => i.status === "ended")
    const changeSessionJoined = useGlobalStore(state => state.changeSessionJoined)
    const changeLeftTime = useGlobalStore(state => state.changeLeftTime)

    const getSession = useCallback(async () => {
        if (userType === "psych") {
            const result: IPsychSessions = await PshycologistsAPI.getMy(sid)
            console.log(result)
            setPsychSession(result.sessions)
        } else {
            const result = await SessionAPI.get(sid)
            setFutureSessions(result.sessions.future)
            setLastSessions(result.sessions.last)
        }
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const [datePart, timePart] = value.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");

        const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

        const formattedDay = formattedDate.getDate();
        const formattedMonth = formattedDate.getMonth();
        const formattedHour = formattedDate.getHours();
        const formattedMinutes = formattedDate.getMinutes();

        return `${formattedDay} ${months[formattedMonth]}, ${String(formattedHour).padStart(2, '0')}:${String(formattedMinutes).padStart(2, '0')}`;
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {userType ? <PsychSidebar /> : <Sidebar />}

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <h2>Мои сессии</h2>
                        <Calendar2Icon onClick={() => navigate(userType !== "psych" ? "/calendar" : "/schedule")} />
                    </div>

                    <div className={styles.Tabs}>
                        {tabs.map((t, index) => (
                            <div key={index} className={t === tab ? styles.ActiveTab : ""} onClick={() => setTab(t)}>
                                {t}
                            </div>
                        ))}
                    </div>

                    {userType !== "psych"
                        ? <>
                            {tab === "Планируемые"
                                ? <>{futureSessions.length !== 0 ? <div className={styles.Grid}>{futureSessions.filter(i => i.status === "pending").map((item, index) => (
                                    <div key={index} className={styles.Item} onClick={() => {
                                        changeSessionJoined(false)
                                        changeLeftTime("")
                                        navigate(`/session/${item.id}`)
                                    }}>
                                        <img src={item.psychPhoto} alt="" />

                                        <div className={styles.ItemBox}>
                                            <div className={styles.RowBox}>
                                                <h3>{item.psychName}</h3>
                                                <ArrowRightIcon />
                                            </div>

                                            <p>{item.sessionNumber} сессия</p>

                                            <h4>{formatDate(item.dateSession)}</h4>

                                            <div className={styles.Payed}>
                                                <CheckIcon />
                                                Оплачено
                                            </div>
                                        </div>
                                    </div>
                                ))}</div>
                                    : <h3 className={styles.No}>Нет запланированных сессий</h3>}</>
                                : <>{lastSessions.length !== 0 ? <div className={styles.Grid}>{lastSessions.map((item, index) => (
                                    <div key={index} className={styles.Item}>
                                        <img src={item.psychPhoto} alt="" />

                                        <div className={styles.ItemBox}>
                                            <div className={styles.RowBox}>
                                                <h3>{item.psychName}</h3>
                                            </div>

                                            <p>{item.sessionNumber} сессия</p>

                                            <h4>{formatDate(item.dateSession)}</h4>
                                        </div>
                                    </div>
                                ))}</div>
                                    : <h3 className={styles.No}>Нет прошедших сессий</h3>}</>
                            }
                        </>

                        : <>
                            {tab === "Планируемые"
                                ? <>{filteredPsychSessions.length !== 0 ? <div className={styles.Grid}>{filteredPsychSessions.map((item, index) => (
                                    <div key={index} className={styles.PsychItem} onClick={() => {
                                        changeSessionJoined(false)
                                        changeLeftTime("")
                                        navigate(`/session/${item.sesId}`)
                                    }}>
                                        <div className={styles.Border} />

                                        <div className={styles.ItemBox}>
                                            <div className={styles.RowBox}>
                                                <h3>{item.userName}</h3>
                                                <ArrowRightIcon />
                                            </div>

                                            <p>{item.sessionNumber} сессия</p>

                                            <h4>{formatDate(item.dateSession)}</h4>

                                            <div className={styles.Payed}>
                                                <CheckIcon />
                                                Запись подтверждена клиентом
                                            </div>
                                        </div>
                                    </div>
                                ))}</div>
                                    : <h3 className={styles.No}>Нет запланированных сессий</h3>}</>
                                : <>{endedSessions.length !== 0 ? <div className={styles.Grid}>{endedSessions.map((item, index) => (
                                    <div key={index} className={styles.PsychItem}>
                                        <div className={styles.Border} />

                                        <div className={styles.ItemBox}>
                                            <h3>{item.userName}</h3>
                                            <p>{item.sessionNumber} сессия</p>
                                            <h4>{formatDate(item.dateSession)}</h4>
                                        </div>
                                    </div>
                                ))}</div>
                                    : <h3 className={styles.No}>Нет прошедших сессий</h3>}</>
                            }
                        </>
                    }
                </div>
            </section>
        </main>
    )
}

export default Sessions