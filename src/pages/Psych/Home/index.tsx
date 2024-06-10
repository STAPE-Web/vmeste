import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { BellIcon, MemoIcon, UserIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

const PsychHome = () => {
    const navigate = useNavigate()

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Session}>
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

                <div className={styles.Memo}>
                    <MemoIcon />
                    <h4>Памятка по взаимодействию</h4>
                </div>
            </section>
        </main>
    )
}

export default PsychHome