import { CardIcon, ConditionIcon, DiaryIcon, FireIcon, PeopleIcon, SettingsIcon } from "@/ui/Icons"
import styles from "./style.module.css"

const Section3 = () => {
    const items = [
        { icon: ConditionIcon, title: "Клиентов", text: "Благодаря сервису у вас будет возможность постоянно получать новых клиентов в том количестве, которое вам комфортно." },
        { icon: CardIcon, title: "Гарантию оплаты сессии", text: "Мы гарантируем всем специалистам своевременную и корректную оплату работы." },
        { icon: SettingsIcon, title: "Удобный личный кабинет", text: "Вы сможете записывать клиентов, смотреть расписание, просматривать отчеты и видеть обратную связь. " },
        { icon: FireIcon, title: "Супервизии", text: "Нашим психологам доступно 5 бесплатных супервизий в год с супервизором ВМЕСТЕ." },
        { icon: DiaryIcon, title: "Обучающие материалы", text: "Мы создали специальные обучающие материалы для наших специалистов: гайды, вебинары, список литературы и другое." },
        { icon: PeopleIcon, title: "Профессиональное комьюнити", text: "Мы регулярно проводим общие онлайн-встречи, чтобы обменяться знаниями и опытом." },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Вы получите:</h2>
                <div className={styles.Grid}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.Item}>
                            <div>
                                <item.icon />
                                <h3>{item.title}</h3>
                            </div>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Section3