import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Avatar from "@/assets/Avatar.png"
import { SearchIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

const Chats = () => {
    const navigate = useNavigate()
    const items = [
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Иван Иванов", lastMessage: "Как чувствуете себя сегодня?", count: 1, time: "17:00" },
        { avatar: Avatar, username: "Ольга Кузнецова", lastMessage: "Спасибо!", count: 0, time: "17:00" },
        { avatar: Avatar, username: "Ольга Кузнецова", lastMessage: "Спасибо!", count: 0, time: "17:00" },
        { avatar: Avatar, username: "Ольга Кузнецова", lastMessage: "Спасибо!", count: 0, time: "17:00" },
    ]

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Search}>
                        <SearchIcon />
                        <input type="text" placeholder="Поиск" />
                    </div>

                    <div className={styles.List}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.Item} onClick={() => navigate(`/chat/${index}`)}>
                                <div className={styles.ItemBox}>
                                    <img src={item.avatar} alt="" />
                                    <div>
                                        <h3>{item.username}</h3>
                                        <p>{item.lastMessage}</p>
                                    </div>
                                </div>

                                <div className={styles.TimeBox}>
                                    <h6>{item.time}</h6>
                                    {item.count !== 0 && <div>{item.count}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chats