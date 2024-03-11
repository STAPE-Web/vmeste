import ButtonHeader from "@/ui/Buttons/Header"
import { Link } from "react-router-dom"
import styles from "./style.module.css"
import { FC, useState } from "react"
import Input from "@/ui/Input"

interface Props {
    setState: React.Dispatch<React.SetStateAction<"Phone" | "Email" | "SMS" | "Code" | "Hello">>
}
const Email: FC<Props> = ({ setState }) => {
    const [email, setEmail] = useState("")

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h2>Вход по почте</h2>
                <p>Отправим код подтверждения</p>
                <div className={styles.Form}>
                    <Input onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" type="text" value={email} />
                    <ButtonHeader disabled={email === ""} onClick={() => setState("Code")}>Получить код</ButtonHeader>
                </div>
                <p className={styles.Enter} onClick={() => setState("Phone")}>Вход по телефону</p>
            </div>

            <button className={styles.EmptyButton}>Вход для психологов</button>

            <p className={styles.Description}>Вводя свой номер, вы принимаете условия <Link to="">пользовательского соглашения</Link>, даете согласие на <Link to="">обработку персональных данных</Link>, получение смс-паролей, а также иных информационных и сервисных сообщений на указанный номер телефона</p>
        </section>
    )
}

export default Email