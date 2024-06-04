import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"

const Clients = () => {
    const navigate = useNavigate()
    const items = [
        { id: "985443", name: "Виктория", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
        { id: "985442", name: "Дмитрий", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
        { id: "985441", name: "Виктория", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
        { id: "985440", name: "Вадим", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
        { id: "985445", name: "Виктория", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
        { id: "985446", name: "Наталья", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
        { id: "985447", name: "Виктория", sessions: 10, lastSession: "30.12.23, 12:00", nextSession: "07.01.24, 15:00" },
    ]

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <h2>Клиенты</h2>
                <h2><span>{items.length}</span> человек</h2>

                <div className={styles.List}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.Item} onClick={() => navigate(`/clients/${item.id}`)}>
                            <h3>{item.name} <span>#{item.id}</span></h3>

                            <div>
                                <p>Всего сессий</p>
                                <p>{item.sessions}</p>
                            </div>

                            <div>
                                <p>Последняя сессия</p>
                                <p>{item.lastSession}</p>
                            </div>

                            <div>
                                <p>Следующая сессия</p>
                                <p>{item.nextSession}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Clients