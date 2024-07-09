import Textarea from "@/ui/Textarea"
import styles from "./style.module.css"
import ButtonDefault from "@/ui/Buttons/Default"
import { useState } from "react"

const SupportService = () => {
    const [text, setText] = useState("")
    return (
        <div className={styles.SupportService}>
            <Textarea onChange={e => setText(e.target.value)} placeholder="Опишите проблему" value={text} />
            <ButtonDefault disabled={text.length === 0} onClick={() => ({})}>Отправить</ButtonDefault>
        </div>
    )
}

export default SupportService