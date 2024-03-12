import { VerifedIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Image from "@/assets/Landing1.png"

const Section4 = () => {
    const items = [
        { title: "Образование", text: "Проверяем дипломы: высшее психологическое, гуманитарное и психотерапевтическое образование." },
        { title: "Опыт работы", text: "Рассматриваем специалистов с подтверждённой практикой от трёх лет." },
        { title: "Этический кодекс", text: "Смотрим, разделяет ли кандидат наши ценности. Профессиональный психолог не оценивает и не осуждает." },
        { title: "Собеседование", text: "Разбираем успешные кейсы и проверяем навыки прямо на вступительном интервью." },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <div className={styles.Box}>
                    <h2>Как мы отбираем психологов:</h2>
                    <div className={styles.Items}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.Item}>
                                <VerifedIcon width={100} height={100} />
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <img src={Image} alt="" className={styles.Image} />
            </div>
        </section>
    )
}

export default Section4