import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, AttachIcon, Calendar2Icon, SearchIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const Chat = () => {
    const navigate = useNavigate()
    const ref = useRef<HTMLDivElement | null>(null)
    const [value, setValue] = useState("")
    const [search, setSearch] = useState(false)

    function scrollDown() {
        if (ref.current) {
            const { scrollHeight, clientHeight } = ref.current;
            ref.current.scrollTop = scrollHeight - clientHeight;
        }
    }

    const [messages, setMessages] = useState([
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
    ])

    function sendMessage() {
        if (value !== "") {
            setMessages(prev => [...prev, {
                me: true,
                content: value,
                time: "13:15",
                type: "text"
            }])

            setValue("")
            setTimeout(() => {
                scrollDown()
            }, 1)
        } else {
            scrollDown()
        }
    }

    useEffect(() => {
        scrollDown()
    }, [])

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        {search
                            ? <>
                                <div className={styles.Search}>
                                    <SearchIcon />
                                    <input type="text" placeholder="Поиск" />
                                </div>
                                <Calendar2Icon onClick={() => navigate("/calendar")} />
                            </>
                            : <>
                                <ArrowLeftIcon onClick={() => navigate(-1)} />
                                <h3>Отправить сообщение</h3>
                                <SearchIcon onClick={() => setSearch(true)} />
                            </>
                        }
                    </div>

                    <div className={styles.MessageBox} ref={ref}>
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
                        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Сообщение..." />
                        <button onClick={() => sendMessage()}>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chat