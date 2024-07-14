import { PshycologistsAPI } from "@/api"
import styles from "./style.module.css"
import PsychSidebar from "@/components/PsyhSidebar"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"

const Note = () => {
    const [value, setValue] = useState("")
    const { id } = useParams()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const navigate = useNavigate()

    async function addNote() {
        const result = await PshycologistsAPI.addNote(sid, id || "", value)
        console.log(result)
        if (result.status == 200) {
            alert("Заметка добавлена")
            navigate(`/clients/${id}`)
        }
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(`/clients/${id}`)} />
                </div>

                <textarea placeholder="Введите текст заметки" value={value} onChange={e => setValue(e.target.value)}></textarea>

                <ButtonDefault disabled={value === ""} onClick={() => addNote()}>Сохранить</ButtonDefault>
            </section>
        </main>
    )
}

export default Note