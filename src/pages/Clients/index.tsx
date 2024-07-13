import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useCallback, useEffect, useState } from "react"
import { ClientsAPI } from "@/api"
import { IClient } from "@/types"

const Clients = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [data, setData] = useState<IClient[]>([])

    const getData = useCallback(async () => {
        const result = await ClientsAPI.get(sid)
        console.log(result.clients)
        setData(result.clients)
    }, [sid])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.MobileHeader}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h3>Клиенты</h3>
                    <div />
                </div>

                <h2 className={styles.Title}>Клиенты</h2>
                <h2><span>{data.length}</span> человек</h2>

                <div className={styles.List}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.Item} onClick={() => navigate(`/clients/${item.userId}`)}>
                            <h3>{item.name}</h3>

                            <div>
                                <p>Всего сессий</p>
                                <p>{item.sessionsCount}</p>
                            </div>

                            <div>
                                <p>Последняя сессия</p>
                                <p>{item.lastSession}</p>
                            </div>

                            {item.futureSession !== null && <div>
                                <p>Следующая сессия</p>
                                <p>{item.futureSession}</p>
                            </div>}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Clients