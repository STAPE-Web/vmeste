import { ArrowRightIcon, CalendarIcon, DiaryIcon, HomeIcon, InfoIcon, MessageIcon, QuestionIcon, SupportIcon, UserIcon, VerifedIcon, WalletIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import { IPsyhProfile } from "@/types"

const PsychSidebar = () => {
    const navigate = useNavigate()
    const path = useLocation()
    const userData: IPsyhProfile = JSON.parse(localStorage.getItem("userData") as string)

    const items = [
        { name: "Главная", icon: HomeIcon, link: "/" },
        { name: "Мои сессии", icon: CalendarIcon, link: "/sessions" },
        // { name: "Полезные материалы", icon: DocumentIcon, link: "/blog" },
        { name: "Сообщения", icon: MessageIcon, link: "/chats" },
    ]

    const items2 = [
        { name: "Настройка профиля", icon: UserIcon, link: "/profile" },
        { name: "Метод и специализация", icon: DiaryIcon, link: "/methods" },
        { name: "Кошелёк", icon: WalletIcon, link: "/wallet" },
    ]

    const items3 = [
        { name: "FAQ", icon: QuestionIcon, link: "/faq" },
        { name: "Памятка психолога", icon: DiaryIcon, link: "/memo" },
        { name: "Служба поддержки", icon: SupportIcon, link: "/support" },
        { name: "О сервисе", icon: InfoIcon, link: "/about" },
    ]

    function signOut() {
        localStorage.removeItem("sid")
        localStorage.removeItem("userType")
        window.location.replace("/")
    }

    return (
        <div className={styles.Sidebar}>
            <div className={styles.User}>
                <div>
                    <div className={styles.Row}>
                        <h3>{userData !== null ? userData.name : ""}</h3>
                        <VerifedIcon />
                    </div>

                    <h6>Ранг: {userData !== null ? userData.level : ""}</h6>
                </div>

                <img src={userData !== null ? userData.photoUrl : ""} alt="" />
            </div>

            <div className={styles.List}>
                {items.map((item, index) => (
                    <div key={index} className={`${styles.Item} ${path.pathname === item.link ? styles.Active : ""}`} onClick={() => navigate(item.link)}>
                        <div>
                            <item.icon />
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))}

                <div className={`${styles.Item} ${styles.MobileItem} ${path.pathname === "/support" ? styles.Active : ""}`} onClick={() => navigate("/support")}>
                    <div>
                        <SupportIcon />
                    </div>
                </div>
            </div>

            <div className={styles.List}>
                {items2.map((item, index) => (
                    <div key={index} className={`${styles.Item} ${path.pathname === item.link ? styles.Active : ""}`} onClick={() => navigate(item.link)}>
                        <div>
                            <item.icon />
                            <p>{item.name}</p>
                        </div>
                        <ArrowRightIcon />
                    </div>
                ))}
            </div>

            <div className={styles.List}>
                {items3.map((item, index) => (
                    <div key={index} className={`${styles.Item} ${path.pathname === item.link ? styles.Active : ""}`} onClick={() => navigate(item.link)}>
                        <div>
                            <item.icon />
                            <p>{item.name}</p>
                        </div>
                        <ArrowRightIcon />
                    </div>
                ))}
            </div>

            <button className={styles.Logout} onClick={() => signOut()}>Выйти из профиля</button>
        </div>
    )
}

export default PsychSidebar