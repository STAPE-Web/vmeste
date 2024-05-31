import { ArrowRightIcon, CalendarIcon, DiaryIcon, DocumentIcon, HomeIcon, InfoIcon, MessageIcon, QuestionIcon, SupportIcon, UserIcon, WalletIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Avatar from "@/assets/Avatar.png"
import { useNavigate } from "react-router-dom"

const PsychSidebar = () => {
    const navigate = useNavigate()

    const items = [
        { name: "Главная", icon: HomeIcon, link: "/" },
        { name: "Мои сессии", icon: CalendarIcon, link: "/sessions" },
        { name: "Полезные материалы", icon: DocumentIcon, link: "/blog" },
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

    return (
        <div className={styles.Sidebar}>
            <div className={styles.User}>
                <div>
                    <h3>Иван Иванов</h3>
                    <h6>Ранг</h6>
                </div>

                <img src={Avatar} alt="" />
            </div>

            <div className={styles.List}>
                {items.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => navigate(item.link)}>
                        <div>
                            <item.icon />
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.List}>
                {items2.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => navigate(item.link)}>
                        <div>
                            <item.icon />
                            {item.name}
                        </div>
                        <ArrowRightIcon />
                    </div>
                ))}
            </div>

            <div className={styles.List}>
                {items3.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => navigate(item.link)}>
                        <div>
                            <item.icon />
                            {item.name}
                        </div>
                        <ArrowRightIcon />
                    </div>
                ))}
            </div>

            <button className={styles.Logout}>Выйти из профиля</button>
        </div>
    )
}

export default PsychSidebar