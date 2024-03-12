import ButtonDefault from "@/ui/Buttons/Default"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"

const Section7 = () => {
    const navigate = useNavigate()

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h3>Получите скидку 10% на первую сессию <br /> по промокоду <span>«ВМЕСТЕ10»</span></h3>
                <ButtonDefault disabled={false} onClick={() => navigate("/auth")}>Выбрать психолога</ButtonDefault>
            </div>
        </section>
    )
}

export default Section7