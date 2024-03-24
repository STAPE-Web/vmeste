import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { SessionAPI } from "@/api"
import { ISession } from "@/types"

const Session = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [data, setData] = useState<ISession | null>(null)
    const { id } = useParams()

    const getSession = useCallback(async () => {
        const result = await SessionAPI.get(sid)
        const allSessions: ISession[] = result.sessions.future
        setData(allSessions.filter(i => i.id === id)[0])
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",]
        const weeks = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
        const date = new Date(value)
        const day = date.getDate()
        const month = date.getMonth()
        const weekDay = date.getDay()

        return `${weeks[weekDay - 1]}, ${day} ${months[month]}`
    }

    function formatTime(value: string) {
        const date = new Date(value)
        const hour = date.getHours()
        const minutes = date.getMinutes()
        return `${String(hour).length === 1 ? `0${hour}` : hour}:${String(minutes).length === 1 ? `0${minutes}` : minutes}`
    }

    async function cancelSession() {
        const result = await SessionAPI.cancel({ sid, sesId: id })
        console.log(result)
        if (result.status === 200) {
            navigate("/sessions")
        }
    }

    if (data === null) return;

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate(-1)} />
                        <h2>{data.psychName} <span>{data.sessionNumber} сессия</span></h2>
                        <h6>Мои сессии</h6>
                        <span></span>
                    </div>

                    <div className={styles.Box}>
                        <p>Ближайшая сессия</p>

                        <div className={styles.Column}>
                            <h4>{formatDate(data.dateSession)}</h4>
                            <h3>{formatTime(data.dateSession)}</h3>
                        </div>

                        <div className={styles.Row}>
                            <button onClick={() => cancelSession()}>Отменить</button>
                            <button>Перенести</button>
                        </div>
                    </div>

                    <div className={styles.Empty}></div>
                </div>
            </section>
        </main>
    )
}

export default Session