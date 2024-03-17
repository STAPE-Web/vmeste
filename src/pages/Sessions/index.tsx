import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

const Session = () => {
    const navigate = useNavigate()

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate(-1)} />
                        <h2>Иван Иванов <span>5 сессия</span></h2>
                        <h6>Мои сессии</h6>
                        <span></span>
                    </div>

                    <div className={styles.Box}>
                        <p>Ближайшая сессия</p>

                        <div className={styles.Column}>
                            <h4>Воскресенье, 7 января</h4>
                            <h3>16:00</h3>
                        </div>

                        <div className={styles.Row}>
                            <button>Отменить</button>
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