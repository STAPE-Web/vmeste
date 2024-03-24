import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowRightIcon, Calendar2Icon, CheckIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { SessionAPI } from "@/api"
import { ISession } from "@/types"

const Sessions = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState("Планируемые")
    const tabs = ["Планируемые", "Прошедшие"]
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const [futureSessions, setFutureSessions] = useState<ISession[]>([])
    const [lastSessions, setLastSessions] = useState<ISession[]>([])

    const getSession = useCallback(async () => {
        const result = await SessionAPI.get(sid)
        setFutureSessions(result.sessions.future)
        setLastSessions(result.sessions.last)
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",]
        const date = new Date(value)
        const day = date.getDate()
        const month = date.getMonth()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        return `${day} ${months[month]}, ${String(hour).length === 1 ? `0${hour}` : hour}:${String(minutes).length === 1 ? `0${minutes}` : minutes}`
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <h2>Мои сессии</h2>
                        <Calendar2Icon onClick={() => navigate("/calendar")} />
                    </div>

                    <div className={styles.Tabs}>
                        {tabs.map((t, index) => (
                            <div key={index} className={t === tab ? styles.ActiveTab : ""} onClick={() => setTab(t)}>
                                {t}
                            </div>
                        ))}
                    </div>

                    {tab === "Планируемые"
                        ? <>{futureSessions.length !== 0 ? <div className={styles.Grid}>{futureSessions.filter(i => i.status !== "canceled").map((item, index) => (
                            <div key={index} className={styles.Item} onClick={() => navigate(`/session/${item.id}`)}>
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
                            <div key={index} className={styles.Item} onClick={() => navigate(`/session/${item.id}`)}>
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
                </div>
            </section>
        </main>
    )
}

export default Sessions