import Logo2 from "@/assets/Logo2"
import Language from "@/components/Language"
import { CloseIcon, MenuIcon, SignInIcon } from "@/ui/Icons"
import { useState } from "react"
import styles from "./style.module.css"
import ButtonHeader from "@/ui/Buttons/Header"
import { useNavigate } from "react-router-dom"

const LandingHeader = () => {
    const navigate = useNavigate()
    const [language, setLanguage] = useState<"RU" | "EN">("RU")
    const sid = JSON.parse(localStorage.getItem('sid') as string)
    const path = window.location.pathname
    const [menu, setMenu] = useState(false)

    return (
        <>
            {!sid && <>
                <header className={styles.Header}>
                    <div className={styles.Container}>
                        <Logo2 className={styles.Logo} onClick={() => navigate("/")} />

                        <div className={styles.Box}>
                            <ul>
                                <li className={path === "/psychologist" ? styles.Active : ""} onClick={() => navigate("/psychologist")}>Для психологов</li>
                                <li className={path === "/about" ? styles.Active : ""} onClick={() => navigate("/about")}>О нас</li>
                                <li onClick={() => navigate("/blog")}>Блог</li>
                                {!sid && <li onClick={() => path !== "/psychologist" ? navigate("/auth") : navigate("/auth/psychologist")}><SignInIcon /> Вход</li>}
                            </ul>

                            {path === "/psychologist"
                                ? <ButtonHeader disabled={false} onClick={() => sid ? navigate("/specialists") : navigate("/auth/psychologist")}>Зарегестрироваться</ButtonHeader>
                                : <ButtonHeader disabled={false} onClick={() => sid ? navigate("/specialists") : navigate("/auth")}>Выбрать психолога</ButtonHeader>

                            }

                            <Language language={language} setLanguage={setLanguage} />

                            <div className={`${styles.Burger} ${menu ? styles.ActiveMenu : ""}`} onClick={() => setMenu(!menu)}>
                                <MenuIcon />
                                <CloseIcon />
                            </div>
                        </div>
                    </div>
                </header>

                <ul className={`${styles.Navigation} ${menu ? styles.ActiveNav : ""}`}>
                    {!sid && <li onClick={() => path !== "/psychologist" ? navigate("/auth") : navigate("/auth/psychologist")}> Вход</li>}
                    <li onClick={() => navigate("/psychologist")}>Для психологов</li>
                    <li onClick={() => navigate("/about")}>О нас</li>
                    <li onClick={() => navigate("/blog")}>Блог</li>
                </ul>
            </>}
        </>
    )
}

export default LandingHeader