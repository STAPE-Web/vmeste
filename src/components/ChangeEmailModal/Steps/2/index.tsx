import { FC, useEffect, useState } from "react"
import styles from "./style.module.css"
import { ProfileAPI } from "@/api"
import ReactCodeInput from "react-code-input"

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>
    login: string
}

const Step1: FC<Props> = ({ setStep, login }) => {
    const [code, setCode] = useState("")
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [time, setTime] = useState(60);

    useEffect(() => {
        setTimeout(() => {
            if (time === 0) {
                setTime(0);
            } else {
                setTime(time - 1);
            }
        }, 1000);
    }, [time]);

    async function step2() {
        const result = await ProfileAPI.step2(sid, Number(code))
        console.log(result)
        if (result.status === 200) {
            setCode("")
            setStep(3)
        } else {
            alert(result.msg)
        }
    }

    useEffect(() => {
        if (code.length === 5) {
            step2();
        }
    }, [code]);

    useEffect(() => {
        const inputs = document.querySelectorAll("input");
        inputs.forEach((i) => (i.type = "number"));
    }, []);

    async function getNewCode() {
        const result = await ProfileAPI.step1(sid);
        console.log(result);
        setTime(60);
    }

    return (
        <div className={styles.Box}>
            <div>
                <h2>Введите код из письма</h2>
                <p>Отправлен на почту <span>{login}</span></p>
            </div>

            <div>
                <ReactCodeInput
                    name="code"
                    inputMode="numeric"
                    value={code}
                    onChange={(value) => setCode(value)}
                    type="number"
                    fields={5}
                    placeholder="·"
                />
                {time === 0 ? (
                    <p className={styles.ResendCode} onClick={() => getNewCode()}>
                        Запросить код повторно
                    </p>
                ) : (
                    <p className={styles.Enter}>
                        Повторно запросить код можно через {time}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Step1