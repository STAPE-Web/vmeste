import { useNavigate } from "react-router-dom"
import ButtonDefault from "../Buttons/Default"
import styles from "./style.module.css"

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.Banner}>
            <h2>У вас пока нет сессий</h2>
            <ButtonDefault onClick={() => navigate("/specialists")} disabled={false}>Выбрать психолога</ButtonDefault>
        </div>
    )
}

export default Banner