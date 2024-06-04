import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, Note2Icon, NoteIcon } from "@/ui/Icons"
import { useState } from "react"
import Avatar from "@/ui/Avatar";
import { useNavigate } from "react-router-dom";

interface Note {
    time: string;
    title: string;
    text: string;
}

interface Themes {
    [key: string]: string[];
}

interface Data {
    avatar: string;
    id: string;
    name: string;
    sessions: number;
    nextSessions: number;
    notes: Note[];
    themes: Themes;
}

const Client = () => {
    const [tab, setTab] = useState("Темы для обсуждения")
    const tabs = ["Темы для обсуждения", "Заметки"]
    const navigate = useNavigate()

    const data: Data = {
        avatar: "",
        id: "386554",
        name: "Мария",
        sessions: 4,
        nextSessions: 0,
        notes: [
            { time: "31.12.2023", title: "Заголовок", text: "Описание заметки описание заметки описание заметки описание заметки..." },
            { time: "31.12.2023", title: "Заголовок", text: "Описание заметки описание заметки описание заметки описание заметки..." },
        ],
        themes: {
            "Состояние": ["Стресс", "Перепады настроения", "Навязчивые мысли о здоровье"],
            "Отношения": ["С детьми"],
            "Работа, учеба": ["Отсутствие цели"],
            "События в жизни": ["Переезд, эмиграция"],
        }
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h2>Клиенты</h2>
                    <NoteIcon className={styles.NoteIcon} />
                </div>

                <div className={styles.UserInfo}>
                    <Avatar name={data.name[0]} url={data.avatar} />
                    <h3>{data.name} <span>#{data.id}</span></h3>
                    <p>Проведено сессий: {data.sessions}</p>
                    <p>{data.nextSessions === 0 ? "Нет назначенных сессий" : `Назначено сессий: ${data.nextSessions}`}</p>
                </div>

                <div className={styles.Tabs}>
                    {tabs.map((t, index) => (
                        <div
                            key={index}
                            className={t === tab ? styles.ActiveTab : ""}
                            onClick={() => setTab(t)}
                        >{t}</div>
                    ))}
                </div>

                {tab === "Темы для обсуждения"
                    ? <div className={styles.Themes}>
                        <h3>Отмеченные клиентом темы для обсуждения:</h3>

                        <div className={styles.ThemesList}>
                            {Object.keys(data.themes).map((theme, index) => (
                                <div key={index}>
                                    <h3>{theme}</h3>
                                    <ul>
                                        {data.themes[theme].map((subtheme, subIndex) => (
                                            <li key={subIndex}>{subtheme}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    : <div className={styles.Notes}>
                        <button className={styles.NoteButton}>
                            <Note2Icon />
                            <p>Добавить заметку</p>
                        </button>

                        {data.notes.map((note, index) => (
                            <div key={index} className={styles.NoteItem}>
                                <h3>{note.title}</h3>
                                <p>{note.text}</p>
                                <h6>{note.time}</h6>
                            </div>
                        ))}
                    </div>
                }
            </section>
        </main>
    )
}

export default Client