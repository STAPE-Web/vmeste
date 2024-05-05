import Input from "@/ui/Input"
import { FC, useState } from "react"
import styles from "./style.module.css"
import ButtonDefault from "@/ui/Buttons/Default"
import { ProfileAPI } from "@/api"

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>
    setLogin: React.Dispatch<React.SetStateAction<string>>
}

const Step2: FC<Props> = ({ setStep, setLogin }) => {
    const [email, setEmail] = useState("")
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    async function step1() {
        const result = await ProfileAPI.step1(sid)
        console.log(result)
        if (result.status === 200) {
            setLogin(email)
            setEmail("")
            setStep(2)
        } else {
            alert(result.msg)
        }
    }

    return (
        <div className={styles.Box}>
            <div>
                <h2>Укажите старую почту</h2>
                <p>Укажите почту, которая на данный момент привязана к аккаунту</p>
            </div>

            <div>
                <Input onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" type="text" value={email} />
                <ButtonDefault disabled={email === ""} onClick={() => step1()}>Получить код</ButtonDefault>
            </div>
        </div>
    )
}

export default Step2