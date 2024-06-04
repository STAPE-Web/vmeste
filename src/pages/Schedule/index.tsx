import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, BellIcon, Calendar2Icon } from "@/ui/Icons"

const Schedule = () => {
    const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пн", "Сб", "Вс"]

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <h2>Расписание</h2>
                    <BellIcon />
                </div>

                <div className={styles.Calendar}>
                    <div className={styles.Info}>
                        <p>1 января</p>

                        <div>
                            <h2>Сегодня</h2>
                            <Calendar2Icon />
                        </div>
                    </div>

                    <div className={styles.Dates}>
                        <ArrowLeftIcon />
                        {dates.slice(0, 7).map((item, index) => (
                            <div key={index}>
                                <span>{weekDays[index]}</span>
                                <p>{item}</p>
                            </div>
                        ))}
                        <ArrowRightIcon />
                    </div>
                </div>

                <div className={styles.Memo}>
                    <Calendar2Icon />
                    <p>На этот день вами не указано свободное время для сессий. Нажмите на значок календаря, чтобы настроить своё расписание.</p>
                </div>
            </section>
        </main>
    )
}

export default Schedule