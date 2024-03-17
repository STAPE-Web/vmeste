import { useNavigate } from "react-router-dom"
import ButtonDefault from "../Buttons/Default"
import styles from "./style.module.css"
import { BellIcon, UserIcon } from "../Icons"

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.Banner}>
            <div className={styles.MobileHeader}>
                <div className={styles.User} onClick={() => navigate("/profile")}>
                    <UserIcon />
                </div>

                <div className={styles.Notifications}>
                    <BellIcon />
                </div>
            </div>

            <div className={styles.Box}>
                <h2>У вас пока нет сессий</h2>
                <ButtonDefault onClick={() => navigate("/specialists")} disabled={false}>Выбрать психолога</ButtonDefault>
            </div>
        </div>
    )
}

export default Banner