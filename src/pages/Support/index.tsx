import PsychSidebar from "@/components/PsyhSidebar"
import ButtonDefault from "@/ui/Buttons/Default"
import { ArrowLeftIcon } from "@/ui/Icons"
import Textarea from "@/ui/Textarea"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./style.module.css"

const Support = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("")

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h2>Сообщение в службу поддержки</h2>
                    <div />
                </div>

                <div className={styles.Form}>
                    <Textarea onChange={e => setText(e.target.value)} placeholder="Опишите проблему" value={text} />
                    <ButtonDefault disabled={text.length === 0} onClick={() => ({})}>Отправить</ButtonDefault>
                </div>
            </section>
        </main>
    )
}

export default Support