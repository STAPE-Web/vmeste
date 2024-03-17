import { AddIcon, CalendarIcon, DocumentIcon, HomeIcon, MessageIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    const path = location.pathname
    const navigate = useNavigate()

    const items = [
        { name: "Главная", icon: HomeIcon, link: "/" },
        { name: "Мои сессии", icon: CalendarIcon, link: "/sessions" },
        { name: "Выбор специалиста", icon: AddIcon, link: "/specialists" },
        { name: "Полезные материалы", icon: DocumentIcon, link: "/blog" },
        { name: "Сообщения", icon: MessageIcon, link: "/chats" },
    ]

    return (
        <div className={styles.Sidebar}>
            {items.map((item, index) => (
                <div key={index} className={path === item.link ? styles.Active : ""} onClick={() => navigate(item.link)}>
                    <item.icon />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Sidebar