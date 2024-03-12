import { useState } from "react"
import styles from "./style.module.css"
import { TimeIcon, VerifedIcon } from "@/ui/Icons"

const Section6 = () => {
    const [tab, setTab] = useState<"индивидуальная" | "парная" | "детская">("индивидуальная")
    const tabs = ["индивидуальная", "парная", "детская"]

    const items = [
        { session: "сессия 50 мин", oldOrice: 2850, price: 2500, text: "Опыт от 3 лет. Прошли собеседование, подтвердили образование, предоставили рекомендацию" },
        { session: "сессия 50 мин", oldOrice: 5200, price: 4500, text: "Опыт от 7 лет. Самые востребованные психологи: супервизоры, члены ассоциаций, авторы научных статей" },
        { session: "сессия 50 мин", oldOrice: 0, price: 1000, text: "Без опыта. Студенты профильных ВУЗов, прошли собеседование, предоставили рекомендацию ВУЗа" },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Тарифы:</h2>

                <div className={styles.Tabs}>
                    {tabs.map((t, id) => (<div key={id} className={`${styles.Tab} ${tab === t ? styles.Active : ""}`} onClick={() => setTab(t as any)}>
                        <div></div>
                        {t}
                    </div>))}
                </div>

                <div className={styles.Items}>
                    {items.map((item, id) => (<div key={id} className={styles.Item}>
                        <div className={styles.Row}>
                            <TimeIcon />
                            {item.session}
                        </div>

                        <div>
                            <h5>{item.oldOrice !== 0 ? `${item.oldOrice} ₽` : "без скидки"}</h5>
                            <h3>{item.price} ₽</h3>
                        </div>

                        <p>{item.text}</p>

                        <div className={styles.Row}>
                            <VerifedIcon />
                            <h4>Видео / аудио консультация</h4>
                        </div>
                    </div>))}
                </div>
            </div>
        </section>
    )
}

export default Section6