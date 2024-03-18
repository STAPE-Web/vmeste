import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowRightIcon, Calendar2Icon, CheckIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Avatar from "@/assets/Psyholog.png"

const Sessions = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState("Планируемые")
    const tabs = ["Планируемые", "Прошедшие"]

    const planed = [
        { image: Avatar, name: "Иван Иванов", session: 5, date: "7 янв, 16:00" },
        { image: Avatar, name: "Иван Иванов", session: 5, date: "7 янв, 16:00" },
        { image: Avatar, name: "Иван Иванов", session: 5, date: "7 янв, 16:00" },
        { image: Avatar, name: "Иван Иванов", session: 5, date: "7 янв, 16:00" },
    ]

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

                    <div className={styles.Grid}>
                        {planed.map((item, index) => (
                            <div key={index} className={styles.Item} onClick={() => navigate("/session/1")}>
                                <img src={item.image} alt="" />

                                <div className={styles.ItemBox}>
                                    <div className={styles.RowBox}>
                                        <h3>{item.name}</h3>
                                        {tab === "Планируемые" && <ArrowRightIcon />}
                                    </div>

                                    <p>{item.session} сессия</p>

                                    <h4>{item.date}</h4>

                                    {tab === "Планируемые" && <div className={styles.Payed}>
                                        <CheckIcon />
                                        Оплачено
                                    </div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Sessions