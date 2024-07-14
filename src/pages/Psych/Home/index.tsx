import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { BellIcon, MemoIcon, UserIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { IPsychSession, IPsychSessions } from "@/types"
import { PshycologistsAPI } from "@/api"
import { getSessionWord, isPastTime2 } from "@/utils"

const PsychHome = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [psychSession, setPsychSession] = useState<IPsychSession[]>([])
    const filteredPsychSessions = psychSession.filter(i => i.status !== "canceled" && isPastTime2(i.dateSession))
    const count = filteredPsychSessions.length

    const getSession = useCallback(async () => {
        const result: IPsychSessions = await PshycologistsAPI.getMy(sid)
        console.log(result)
        setPsychSession(result.sessions)
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Session} onClick={() => navigate("/sessions")}>
                    <div className={styles.MobileHeader}>
                        <div className={styles.User} onClick={e => {
                            e.stopPropagation()
                            navigate("/profile")
                        }}>
                            <UserIcon />
                        </div>

                        <div className={styles.Notifications}>
                            <BellIcon />
                        </div>
                    </div>

                    <p>Ближайшая сессия</p>
                    <h3>{count === 0 ? "У вас пока нет сессий" : `Запланирован${count <= 1 ? "а" : "о"} ${filteredPsychSessions.length} ${getSessionWord(count)}`}</h3>
                </div>


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

                <div className={styles.Memo} onClick={() => navigate("/memo")}>
                    <MemoIcon />
                    <h4>Памятка по взаимодействию</h4>
                </div>
            </section>
        </main>
    )
}

export default PsychHome