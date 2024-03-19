import styles from "./style.module.css"
import { FC, useEffect, useState } from "react"
import ReactCodeInput from "react-code-input"

interface Props {
    setState: React.Dispatch<React.SetStateAction<"Phone" | "Email" | "SMS" | "Code" | "Hello">>
    authData: string
}

const SMS: FC<Props> = ({ setState, authData }) => {
    const [code, setCode] = useState("")
    const [time, setTime] = useState(60)

    useEffect(() => {
        setTimeout(() => {
            if (time === 0) {
                setTime(0)
            } else {
                setTime(time - 1)
            }
        }, 1000)
    }, [time])

    useEffect(() => {
        if (code.length === 5) {
            setState("Hello")
        }
    }, [code])

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h2>Введите код из SMS</h2>
                <p>Отправлен на номер <span>{authData}</span></p>
                <div className={styles.Form}>
                    <ReactCodeInput name="code" inputMode="email" value={code} onChange={value => setCode(value)} type='text' fields={5} />
                </div>
                {time === 0
                    ? <p className={styles.ResendCode}>Запросить код повторно</p>
                    : <p className={styles.Enter}>Повторно запросить код можно через {time}</p>
                }
            </div>

            <div className={styles.BottomBox}>
                <p onClick={() => setState("Email")}>Вход по почте</p>
                <p>Не приходит SMS?</p>
            </div>
        </section>
    )
}

export default SMS