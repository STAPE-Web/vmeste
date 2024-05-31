import styles from "./style.module.css"
import ButtonDefault from "@/ui/Buttons/Default"
import { useNavigate } from "react-router-dom"

const Section4 = () => {
    const navigate = useNavigate()

    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h3>Развивайте свою практику ВМЕСТЕ <br /> с психологами нашего сервиса</h3>
                <ButtonDefault disabled={false} onClick={() => navigate("/auth/psychologist")}>Подать заявку</ButtonDefault>
            </div>
        </section>
    )
}

export default Section4