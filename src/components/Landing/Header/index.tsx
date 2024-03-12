import Logo2 from "@/assets/Logo2"
import Language from "@/components/Language"
import { SignInIcon } from "@/ui/Icons"
import { useState } from "react"
import styles from "./style.module.css"
import ButtonHeader from "@/ui/Buttons/Header"
import { useNavigate } from "react-router-dom"

const LandingHeader = () => {
    const navigate = useNavigate()
    const [language, setLanguage] = useState<"RU" | "EN">("RU")
    const isAuth = JSON.parse(localStorage.getItem('isAuth') as string)
    const path = window.location.pathname

    return (
        <header className={styles.Header}>
            <div className={styles.Container}>
                <Logo2 className={styles.Logo} onClick={() => navigate("/")} />

                <div className={styles.Box}>
                    <ul>
                        <li>Для психологов</li>
                        <li className={path === "/about" ? styles.Active : ""} onClick={() => navigate("/about")}>О нас</li>
                        <li>Блог</li>
                        {!isAuth && <li><SignInIcon /> Вход</li>}
                    </ul>

                    <ButtonHeader disabled={false} onClick={() => isAuth ? navigate("/specialists") : navigate("/auth")}>Выбрать психолога</ButtonHeader>

                    <Language language={language} setLanguage={setLanguage} />
                </div>
            </div>
        </header>
    )
}

export default LandingHeader