import { Like2Icon } from "@/ui/Icons"
import styles from "./styles.module.css"
import Avatar from "@/assets/Avatar.png"

const SavedList = () => {
    const items = [
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
        { image: Avatar, name: "Константин Никольский", text: "Индивидуальная сессия 50 мин", price: "2 500" },
    ]

    return (
        <div className={styles.List}>
            {items.map((item, index) => (
                <div key={index}>
                    <Like2Icon />

                    <img src={item.image} alt="" />
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                    <h4>{item.price} ₽</h4>
                    <button>Выбрать</button>
                </div>
            ))}
        </div>
    )
}

export default SavedList