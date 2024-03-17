import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, AttachIcon, SearchIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

const Chat = () => {
    const navigate = useNavigate()
    const messages = [
        {
            me: true,
            content: "Как понять, что мне нужен психолог?",
            type: "text",
            time: "13:15"
        },
        {
            me: false,
            content: `Психолог нужен, если хочется привести в порядок свои мысли и чувства.\n\nК примеру, у вас не складываются отношения с партнёром. Или никак не получается "найти себя" и раздражает работа. Или кажется, что в будущем ждёт только плохое — и от этого тревожно. На сеансах с терапевтом можно поговорить об этом, изучить прошлый опыт, обнаружить негативные модели мышления и научиться реагировать на ситуации иначе.\n\nИногда бывает, что у клиента вроде бы нет готовой темы для разговора с терапевтом, но этот разговор почему-то нужен. А порой люди, переживающие тяжёлый развод или смерть близких, не испытывают потребности в терапии — и это тоже нормально.`,
            type: "text",
            time: "13:15"
        },
        {
            me: false,
            content: `Психолог нужен, если хочется привести в порядок свои мысли и чувства.\n\nК примеру, у вас не складываются отношения с партнёром. Или никак не получается "найти себя" и раздражает работа. Или кажется, что в будущем ждёт только плохое — и от этого тревожно. На сеансах с терапевтом можно поговорить об этом, изучить прошлый опыт, обнаружить негативные модели мышления и научиться реагировать на ситуации иначе.\n\nИногда бывает, что у клиента вроде бы нет готовой темы для разговора с терапевтом, но этот разговор почему-то нужен. А порой люди, переживающие тяжёлый развод или смерть близких, не испытывают потребности в терапии — и это тоже нормально.`,
            type: "text",
            time: "13:15"
        },
    ]

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate(-1)} />
                        <h3>Отправить сообщение</h3>
                        <SearchIcon />
                    </div>

                    <div className={styles.MessageBox}>
                        <h6>1 янв. 2024</h6>
                        {messages.map((msg, index) => (
                            <div key={index} className={`${styles.Message} ${msg.me ? styles.MyMessage : ""}`}>
                                <div>
                                    {msg.content}
                                    <p>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.Input}>
                        <AttachIcon />
                        <input type="text" placeholder="Сообщение..." />
                        <button>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chat