import { ArrowLeftIcon, ArrowRightIcon, InfoIcon, LikeIcon, SettingsIcon, SupportIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Avatar from "@/assets/Avatar.svg"
import { useCallback, useEffect, useState } from "react"
import SavedList from "@/components/SavedList"
import SettingsList from "@/components/SettingsList"
import SupportService from "@/components/SupportService"
import About from "@/assets/About.png"
import { useNavigate } from "react-router-dom"
import { AuthAPI } from "@/api"
import { IProfile } from "@/types"

const Profile = () => {
    const [mode, setMode] = useState<"saved" | "settings" | "support" | "about" | "">("saved")
    const navgate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const [data, setData] = useState<IProfile | null>(null)

    const getProfile = useCallback(async () => {
        const result = await AuthAPI.getProfile(sid)
        setData(result)
    }, [sid])

    useEffect(() => {
        getProfile()
    }, [getProfile])

    const navigate = [
        { name: "Сохраненные психологи", mode: "saved", icon: LikeIcon },
        { name: "Настройка профиля", mode: `settings`, icon: SettingsIcon },
        // { name: "Способы оплаты", mode: "payment", icon: WalletIcon },
        { name: "Служба поддержки", mode: "support", icon: SupportIcon },
        { name: "О сервисе", mode: "about", icon: InfoIcon },
    ]

    function fillContent() {
        // if (data === null) return;

        switch (mode) {
            case "saved": return <>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => setMode("")} />
                    <h2>Сохраненные психологи</h2>
                    <span></span>
                </div>
                {data?.savedPsychs.length !== 0
                    ? <SavedList getProfile={getProfile} />
                    : <p>Нет сохраненных психологов</p>
                }
            </>

            case "settings": return <>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => setMode("")} />
                    <h2>Настройки профиля</h2>
                    <span></span>
                </div>
                {data !== null && <SettingsList data={data} />}
            </>

            case "support": return <>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => setMode("")} />
                    <h2>Служба поддержки</h2>
                    <span></span>
                </div>
                <SupportService />
            </>

            case "about": return <>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => setMode("")} />
                    <h2>О сервисе</h2>
                    <span></span>
                </div>
                <p>"Название" – это сервис видеоконсультаций с психотерапевтами, которым можно пользоваться из любого места и с любого устройства. Видеосвязь осуществляется через собственное, разработанное инхаус, решение, которое обеспечивает высокий уровень конфиденциальности и безопасности для клиента.</p>
                <img className={styles.AboutImage} src={About} alt="" />
                <div className={styles.Row}>
                    <p>Лицензии</p>
                    <p>Правила и соглашения</p>
                </div>
            </>
        }
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 768) {
                setMode("")
            } else if (window.innerWidth >= 768) {
                setMode("saved")
            }
        })

        if (window.innerWidth <= 768) {
            setMode("")
        } else if (window.innerWidth >= 768) {
            setMode("saved")
        }
    }, [])

    return (
        <main className={styles.Page}>
            <section className={`${styles.Sidebar} ${mode === "" ? styles.ActiveSidebar : ""}`}>
                <div className={styles.Back} onClick={() => navgate("/")}><ArrowLeftIcon /> Назад</div>

                <div className={styles.AccountInfo}>
                    <h3>{data?.userInfo.name}</h3>
                    <img src={Avatar} alt="" />
                </div>

                <div className={styles.RefferalBox}>
                    <p>Пригласи друга в приложение <span>получи скидку 20%</span></p>
                    <a href="https://vmeste.netlify.app/"><button>Пригласить</button></a>
                </div>

                <div className={styles.Navigation}>
                    {navigate.map((item, index) => (
                        <div key={index} className={`${styles.Item} ${item.mode === mode ? styles.Active : ""}`} onClick={() => setMode(item.mode as any)}>
                            <div>
                                <item.icon />
                                {item.name}
                            </div>

                            <ArrowRightIcon />
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.Content} ${mode === "support" ? styles.Support : ""}`}>
                {fillContent()}
            </section>
        </main>
    )
}

export default Profile