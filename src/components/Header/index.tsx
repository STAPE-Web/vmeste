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
    const sid = JSON.parse(localStorage.getItem('sid') as string)
    const userType = localStorage.getItem('userType')
    const path = window.location.pathname

    return (
        <>
            {sid && path !== "/about" && <header className={styles.Header}>
                <div className={styles.Container}>
                    <Logo onClick={() => navigate("/")} />

                    <div className={styles.Box}>
                        <ul>
                            {userType === "psych"
                                ? <li onClick={() => navigate("/")}>Главная</li>
                                : <li onClick={() => navigate("/psychologist")}>Для психологов</li>
                            }
                            <li onClick={() => navigate("/about")}>О нас</li>
                            <li onClick={() => navigate("/blog")}>Блог</li>
                            {!sid && <li onClick={() => navigate("/auth")}><SignInIcon /> Вход</li>}
                        </ul>

                        {userType === "psych"
                            ? <ButtonHeader disabled={false} onClick={() => navigate("/schedule")}>Расписание</ButtonHeader>
                            : <ButtonHeader disabled={false} onClick={() => navigate("/specialists")}>Выбрать психолога</ButtonHeader>
                        }

                        <Language language={language} setLanguage={setLanguage} />
                    </div>
                </div>
            </header>}
        </>
    )
}

export default Header