import { AuthAPI } from "@/api"
import styles from "./style.module.css"
import { FC, useCallback, useEffect, useState } from "react"
import ReactCodeInput from "react-code-input"

interface Props {
    setState: React.Dispatch<React.SetStateAction<"Phone" | "Email" | "SMS" | "Code" | "Hello">>
    authData: string
}

const Code: FC<Props> = ({ setState, authData }) => {
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

    const authCode = useCallback(async () => {
        const result = await AuthAPI.verifyCode(authData, Number(code))
        console.log(result)
        if (result.status === 201) {
            localStorage.setItem("sid", JSON.stringify(result.sid))
            setState("Hello")
        }

        if (result.status === 200) {
            localStorage.setItem("sid", JSON.stringify(result.sid))
            window.location.replace("/")
        }

        if (result.status === 404) {
            alert("Неверный код")
        }
    }, [authData, code])

    useEffect(() => {
        if (code.length === 5) {
            authCode()
        }
    }, [code])

    async function getNewCode() {
        const result = await AuthAPI.sendCode(authData)
        console.log(result)
        setTime(60)
    }

    useEffect(() => {
        const inputs = document.querySelectorAll("input")
        inputs.forEach(i => i.type = "number")
    }, [])

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h2>Введите код из письма</h2>
                <p>Отправлен на <span>{authData}</span></p>
                <div className={styles.Form}>
                    <ReactCodeInput name="code" inputMode="tel" value={code} onChange={value => setCode(value)} type='number' fields={5} placeholder="·" />
                </div>
                {time === 0
                    ? <p className={styles.ResendCode} onClick={() => getNewCode()}>Запросить код повторно</p>
                    : <p className={styles.Enter}>Повторно запросить код можно через {time}</p>
                }
            </div>

            <div className={styles.BottomBox}>
                <p onClick={() => setState("Phone")}>Вход по телефону</p>
                <p>Не приходит SMS?</p>
            </div>
        </section>
    )
}

export default Code