import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { StableIcon, Time2Icon, UserIcon, VerifedIcon } from "@/ui/Icons"
import Favicon from "@/assets/Favicon"
import BarChart from "@/components/BarChart"
import PieChart from "@/ui/PieChart"

const Statistics = () => {
    const videoData = [
        { month: "Ноябрь", value: 100, amount: 12, max: 12 },
        { month: "Декабрь", value: 84, amount: 5, max: 6 },
    ]

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <h2>Статистика</h2>

                <div className={styles.List}>
                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <VerifedIcon />
                            <h4>Опыт</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>5 лет <br />8 месяцев</h3>
                        </div>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <UserIcon />
                            <h4>Ваши клиенты</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>7 всего</h3>
                            <p>4 активных</p>
                        </div>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <StableIcon />
                            <h4>Устойчивость терапии</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>57%</h3>
                            <p>Более 6 сессий<br />с 4 из 7 клиентов</p>
                        </div>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <Time2Icon />
                            <h4>Средняя <br /> длительность терапии</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>8 сессий</h3>
                            <p>Самые долгие — 18 <br /> Дмитрий</p>
                        </div>
                    </div>
                </div>

                <div className={styles.WithUs}>
                    <div className={styles.Row}>
                        <p>Вы с Вместе</p>
                        <Favicon />
                    </div>

                    <h3>4 мес 18 дней</h3>
                </div>

                <div className={styles.Sessions}>
                    <h3>Сессий проведено</h3>
                    <BarChart />

                    <div className={styles.Row}>
                        <h4>59 всего</h4>
                        <p>За 12 месяцев</p>
                    </div>
                </div>

                <div className={styles.VideoCall}>
                    <h2>Использование видеосвязи</h2>

                    <div className={styles.VideoList}>
                        {videoData.map((item, index) => (
                            <div key={index} className={styles.VideoItem}>
                                <h3>{item.month}</h3>
                                <PieChart value={item.value} />
                                <p>{item.amount} из {item.max} сессий<br />проведены<br />на платформе</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Statistics