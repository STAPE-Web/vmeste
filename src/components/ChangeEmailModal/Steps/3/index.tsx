import Input from "@/ui/Input"
import { FC, useState } from "react"
import styles from "./style.module.css"
import ButtonDefault from "@/ui/Buttons/Default"
import { ProfileAPI } from "@/api"

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>
    setLogin: React.Dispatch<React.SetStateAction<string>>
}

const Step3: FC<Props> = ({ setStep, setLogin }) => {
    const [email, setEmail] = useState("")
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    async function step3() {
        const result = await ProfileAPI.step3(sid, email)
        setLogin(email)
        console.log(result)
        if (result.status === 200) {
            setStep(4)
        } else {
            alert(result.msg)
        }
    }

    return (
        <div className={styles.Box}>
            <h2>Укажите новую почту</h2>

            <div>
                <Input onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" type="text" value={email} />
                <ButtonDefault disabled={email === ""} onClick={() => step3()}>Получить код</ButtonDefault>
            </div>
        </div>
    )
}

export default Step3