import { AttachIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Avatar from "@/assets/Avatar.png"
import Avatar2 from "@/assets/Avatar2.png"
import Avatar3 from "@/assets/Avatar3.png"
import Avatar4 from "@/assets/Avatar4.png"
import Avatar5 from "@/assets/Avatar5.png"
import Avatar6 from "@/assets/Avatar6.png"
import ArrowRight from "@/ui/Icons/ArrowRight"

const SupportService = () => {
    return (
        <div className={styles.SupportService}>
            <div className={styles.HelloBox}>
                <h2>Чем мы можем вам помочь?</h2>
                <p>Обычно ответ занимает не более 2 мин</p>
                <div className={styles.Avatars}>
                    <img src={Avatar} alt="" />
                    <img src={Avatar2} alt="" />
                    <img src={Avatar3} alt="" />
                    <img src={Avatar4} alt="" />
                    <img src={Avatar5} alt="" />
                    <img src={Avatar6} alt="" />
                </div>
            </div>

            <div className={styles.Input}>
                <AttachIcon />
                <input type="text" placeholder="Начать разговор" />
                <button>
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}

export default SupportService