import { VerifedIcon } from "@/ui/Icons"
import styles from "./style.module.css"

const Section2 = () => {
    const items = [
        { title: "Высшее образование", text: "Необходимо прислать сканы дипломов. Мы сотрудничаем только с теми, у кого есть высшее психологическое образование." },
        { title: "Опыт 3 и более лет", text: "Мы сотрудничаем с психологами, которые консультируют не менее 3-х лет в индивидуальном, групповом или семейном формате." },
        { title: "Опыт личной терапии", text: "Обязательно наличие регулярной индивидуальной личной психотерапии в качестве клиента не менее 50 часов." },
        { title: "Опыт работы в онлайн-формате", text: "Нам важно, чтобы вы умели и были готовы работать в формате видеосессий, синхронной и асинхронной переписки." },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Требования к психологам:</h2>
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
        </section>
    )
}

export default Section2