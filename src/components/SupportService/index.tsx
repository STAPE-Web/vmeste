import Textarea from "@/ui/Textarea"
import styles from "./style.module.css"
import ButtonDefault from "@/ui/Buttons/Default"
import { useState } from "react"
import { SupportAPI } from "@/api"

const SupportService = () => {
    const [text, setText] = useState("")
    const sid = JSON.parse(localStorage.getItem("sid") as string);

    async function SendMessage() {
        const result = await SupportAPI.sendMessage(sid, text)
        console.log(result)
        if (result.status === 200) {
            alert("Сообщение отправлено")
            setText("")
        }
    }

    return (
        <div className={styles.SupportService}>
            <Textarea onChange={e => setText(e.target.value)} placeholder="Опишите проблему" value={text} />
            <ButtonDefault disabled={text.length === 0} onClick={() => SendMessage()}>Отправить</ButtonDefault>
        </div>
    )
}

export default SupportService