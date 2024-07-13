import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowRightIcon, BellIcon, CheckIcon, MemoIcon, UserIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { IPsychSession, IPsychSessions } from "@/types"
import { PshycologistsAPI } from "@/api"
import { isPastTime2 } from "@/utils"

const PsychHome = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [psychSession, setPsychSession] = useState<IPsychSession[]>([])

    const getSession = useCallback(async () => {
        const result: IPsychSessions = await PshycologistsAPI.getMy(sid)
        console.log(result)
        setPsychSession(result.sessions)
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
            <PsychSidebar />

            <section className={styles.Section}>
                <>{psychSession.length !== 0 ? <div className={styles.Grid}>{psychSession.filter(i => i.status !== "canceled" && isPastTime2(i.dateSession)).map((item, index) => (
                    <div key={index} className={styles.PsychItem} onClick={() => {
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
                    : <div className={styles.Session}>
                        <div className={styles.MobileHeader}>
                            <div className={styles.User} onClick={() => navigate("/profile")}>
                                <UserIcon />
                            </div>

                            <div className={styles.Notifications}>
                                <BellIcon />
                            </div>
                        </div>

                        <p>Ближайшая сессия</p>
                        <h3>У вас пока нет сессий</h3>
                    </div>}</>

                <div className={styles.Row}>
                    <div className={styles.Payments} onClick={() => navigate("/wallet")}><h3>Выплаты</h3></div>
                    <div className={styles.Stats} onClick={() => navigate("/statistic")}><h3>Статистика</h3></div>
                </div>

                <div className={styles.Row}>
                    <div className={styles.Clients} onClick={() => navigate("/clients")}><h3>Клиенты</h3></div>
                </div>

                <div className={styles.Row}>
                    <div className={styles.Schedule} onClick={() => navigate("/schedule")}><h3>Расписание</h3></div>
                </div>

                <div className={styles.Memo}>
                    <MemoIcon />
                    <h4>Памятка по взаимодействию</h4>
                </div>
            </section>
        </main>
    )
}

export default PsychHome