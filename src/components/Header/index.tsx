import Logo from "@/assets/Logo"
import ButtonHeader from "@/ui/Buttons/Header"
import { SignInIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { useState } from "react"
import Language from "../Language"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    const [language, setLanguage] = useState<"RU" | "EN">("RU")
    const isAuth = JSON.parse(localStorage.getItem('isAuth') as string)

    return (
        <header className={styles.Header}>
            <div className={styles.Container}>
                <Logo onClick={() => navigate("/")} />

                <div className={styles.Box}>
                    <ul>
                        <li>Для психологов</li>
                        <li>О нас</li>
                        <li>Блог</li>
                        {!isAuth && <li><SignInIcon /> Вход</li>}
                    </ul>

                    <ButtonHeader disabled={false} onClick={() => ({})}>Выбрать психолога</ButtonHeader>

                    <Language language={language} setLanguage={setLanguage} />
                </div>
            </div>
        </header>
    )
}

export default Header