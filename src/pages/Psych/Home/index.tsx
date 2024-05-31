import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { MemoIcon } from "@/ui/Icons"

const PsychHome = () => {
    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Session}>
                    <p>Ближайшая сессия</p>
                    <h3>У вас пока нет сессий</h3>
                </div>

                <div className={styles.Row}>
                    <div className={styles.Payments}><h3>Выплаты</h3></div>
                    <div className={styles.Stats}><h3>Статистика</h3></div>
                </div>

                <div className={styles.Clients}><h3>Клиенты</h3></div>
                <div className={styles.Schedule}><h3>Расписание</h3></div>

                <div className={styles.Memo}>
                    <MemoIcon />
                    <h4>Памятка по взаимодействию</h4>
                </div>
            </section>
        </main>
    )
}

export default PsychHome