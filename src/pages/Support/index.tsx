import PsychSidebar from "@/components/PsyhSidebar"
import ButtonDefault from "@/ui/Buttons/Default"
import { ArrowLeftIcon } from "@/ui/Icons"
import Textarea from "@/ui/Textarea"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./style.module.css"
import { SupportAPI } from "@/api"

const Support = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const sid = JSON.parse(localStorage.getItem("sid") as string);
    const pageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (pageRef.current) {
            if (window.innerWidth <= 768) {
                pageRef.current.style.height = `calc(100vh - 70px)`
            } else {
                pageRef.current.style.height = `auto`
            }
        }
    }, [])

    async function SendMessage() {
        const result = await SupportAPI.sendMessage(sid, text)
        if (result.status === 200) {
            alert("Сообщение отправлено")
            setText("")
        }
    }

    return (
        <main className={styles.Page} ref={pageRef}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h2>Сообщение в службу поддержки</h2>
                    <div />
                </div>

                <div className={styles.Form}>
                    <Textarea onChange={e => setText(e.target.value)} placeholder="Опишите проблему" value={text} />
                    <ButtonDefault disabled={text.length === 0} onClick={() => SendMessage()}>Отправить</ButtonDefault>
                </div>
            </section>
        </main>
    )
}

export default Support