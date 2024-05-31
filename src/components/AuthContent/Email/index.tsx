import ButtonHeader from "@/ui/Buttons/Header"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./style.module.css"
import { FC, useState } from "react"
import Input from "@/ui/Input"
import { AuthAPI } from "@/api"

interface Props {
    setState: React.Dispatch<React.SetStateAction<"Phone" | "Email" | "SMS" | "Code" | "Hello">>
    setAuthData: React.Dispatch<React.SetStateAction<string>>
}
const Email: FC<Props> = ({ setState, setAuthData }) => {
    const [email, setEmail] = useState("")
    const path = useLocation().pathname.split("/")[2]
    const navigate = useNavigate()

    async function authorize() {
        setAuthData(email)
        const result = await AuthAPI.sendCode(email, path !== undefined)
        console.log(result)
        if (result.status === 200) {
            setState("Code")
        }
    }

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h2>Вход по почте</h2>
                <p>Отправим код подтверждения</p>
                <div className={styles.Form}>
                    <Input onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" type="text" value={email} />
                    <ButtonHeader disabled={email === ""} onClick={() => authorize()}>Получить код</ButtonHeader>
                </div>
                <div className={styles.Row}>
                    <p className={styles.Enter} onClick={() => setState("Phone")}>Вход по телефону</p>
                    {path !== undefined && <p className={styles.Enter} onClick={() => navigate("/psychologist/create")}>Создать аккаунт</p>}
                </div>
            </div>

            {path !== undefined
                ? <button className={styles.EmptyButton} onClick={() => navigate("/auth")}>Вход для пользователей</button>
                : <button className={styles.EmptyButton} onClick={() => navigate("/auth/psychologist")}>Вход для психологов</button>
            }

            <p className={styles.Description}>Вводя свой номер, вы принимаете условия <Link to="">пользовательского соглашения</Link>, даете согласие на <Link to="">обработку персональных данных</Link>, получение смс-паролей, а также иных информационных и сервисных сообщений на указанный номер телефона</p>
        </section>
    )
}

export default Email