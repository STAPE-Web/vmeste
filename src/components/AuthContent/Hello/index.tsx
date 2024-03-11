import ButtonDefault from "@/ui/Buttons/Default"
import styles from "./style.module.css"
import Illustration from "@/assets/Illustration.png"
import { useNavigate } from "react-router-dom"

const Hello = () => {
    const navigate = useNavigate()

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <img src={Illustration} alt="" />
                <h2>Привет!</h2>
                <h2>Психологи нашего сервиса готовы помочь</h2>
                <p>Ответьте на вопросы и узнайте, кто из проверенных специалистов подходит именно вам</p>
            </div>
            <ButtonDefault onClick={() => navigate("/register")} disabled={false}>Выбрать психолога</ButtonDefault>
        </section>
    )
}

export default Hello