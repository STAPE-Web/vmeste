import ButtonHeader from "@/ui/Buttons/Header"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./style.module.css"
import React, { FC, useState } from "react"
import Select from "@/ui/Select"
import Input from "@/ui/Input"
import { AuthAPI } from "@/api"
import { countryCodes } from "./constants"

interface Props {
    setState: React.Dispatch<React.SetStateAction<"Phone" | "Email" | "SMS" | "Code" | "Hello">>
    setAuthData: React.Dispatch<React.SetStateAction<string>>
}

const Phone: FC<Props> = ({ setState, setAuthData }) => {
    const [country, setCountry] = useState({ name: "Россия", code: "+7" })
    const [phone, setPhone] = useState("")
    const [active, setActive] = useState(false)
    const path = useLocation().pathname.split("/")[2]
    const navigate = useNavigate()

    async function authorize() {
        setAuthData(phone)
        const result = await AuthAPI.sendCode(`+7${phone}`, path !== undefined)
        console.log(result)
        if (result.status === 200) {
            setState("SMS")
        }
    }

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h2>Создайте аккаунт или войдите</h2>
                <p>Укажите номер телефона, который можно <br /> подтвердитьс помощью SMS</p>
                <div className={styles.Form}>
                    <div className={`${styles.SelectBox} ${active ? styles.SelectBoxActive : ""}`}>
                        <Select active={active} selectActive={setActive} value={country.name} />
                        <div className={styles.DropDown}>
                            {countryCodes.map((item, index) => (
                                <div key={index} onClick={() => {
                                    setActive(false)
                                    setCountry(item)
                                }}>
                                    {item.name}
                                    <span>{item.code}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Input onChange={e => setPhone(e.target.value)} code={country.code} placeholder="ххх ххх-хх-хх" type="tel" value={phone} />
                    <ButtonHeader disabled={phone.length !== 10} onClick={() => authorize()}>Получить код</ButtonHeader>
                </div>

                <p className={styles.Enter} onClick={() => setState("Email")}>Вход по почте</p>
            </div>

            {path !== undefined
                ? <button className={styles.EmptyButton} onClick={() => navigate("/auth")}>Вход для пользователей</button>
                : <button className={styles.EmptyButton} onClick={() => navigate("/auth/psychologist")}>Вход для психологов</button>
            }

            <p className={styles.Description}>Вводя свой номер, вы принимаете условия <Link to="">пользовательского соглашения</Link>, даете согласие на <Link to="">обработку персональных данных</Link>, получение смс-паролей, а также иных информационных и сервисных сообщений на указанный номер телефона</p>
        </section>
    )
}

export default Phone