import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, DeleteIcon, Note2Icon, NoteIcon } from "@/ui/Icons"
import { useCallback, useEffect, useState } from "react"
import Avatar from "@/ui/Avatar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ClientsAPI, PshycologistsAPI } from "@/api";
import { IClient } from "@/types";

const Client = () => {
    const [tab, setTab] = useState("Темы для обсуждения")
    const tabs = ["Темы для обсуждения", "Заметки"]
    const navigate = useNavigate()
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const isNotes = searchParams.get("notes")
    console.log(isNotes)

    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [data, setData] = useState<IClient | null>(null)

    const getData = useCallback(async () => {
        const result = await ClientsAPI.get(sid)
        const clients: IClient[] = result.clients
        const client: IClient = clients.filter(i => i.userId === id)[0]
        setData(client)
    }, [sid])

    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        if (isNotes) {
            setTab("Заметки")
            searchParams.delete("notes")
            setSearchParams(searchParams)
        }
    }, [isNotes])

    async function removeNote(index: number) {
        const result = await PshycologistsAPI.removeNote(sid, id || "", index)
        console.log(result)
        if (result.status == 200) {
            alert("Заметка удалена")
            getData()
        }
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h2>Клиенты</h2>
                    <NoteIcon className={styles.NoteIcon} onClick={() => navigate(`/note/${id}`)} />
                </div>

                <div className={styles.UserInfo}>
                    <Avatar name={data?.name[0] || ""} url="" />
                    <h3>{data?.name}</h3>
                    <p>Проведено сессий: {data?.sessionsCount}</p>
                    <p>{data?.futureSession === null ? "Нет назначенных сессий" : `Назначено сессий: ${data?.futureSession}`}</p>
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
                            <ul>
                                {data?.themes.map((subtheme, subIndex) => (
                                    <li key={subIndex}>{subtheme}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : <div className={styles.Notes}>
                        <button className={styles.NoteButton} onClick={() => navigate(`/note/${id}`)}>
                            <Note2Icon />
                            <p>Добавить заметку</p>
                        </button>

                        {data?.notes.map((note, index) => (
                            <div key={index} className={styles.NoteItem}>
                                <p>{note}</p>
                                <DeleteIcon onClick={() => removeNote(index)} />
                            </div>
                        ))}
                    </div>
                }
            </section>
        </main>
    )
}

export default Client