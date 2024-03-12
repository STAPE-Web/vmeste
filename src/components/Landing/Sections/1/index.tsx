import ButtonDefault from "@/ui/Buttons/Default"
import styles from "./style.module.css"
import Illustration from "@/assets/Illustration"
import { CameraIcon, TimeIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

const Section1 = () => {
    const navigate = useNavigate()
    const items = [
        { name: "сессия 50 мин", icon: TimeIcon },
        { name: "видео-консультация", icon: CameraIcon },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <div className={styles.Box}>
                    <div className={styles.Items}>
                        {items.map((item, index) => (
                            <div key={index}>
                                <item.icon />
                                {item.name}
                            </div>
                        ))}
                    </div>

                    <h1>Консультации <br /> <span>с психологом онлайн</span></h1>
                    <h3>Подберём психолога, который поможет</h3>

                    <div className={styles.Price}>от 2500₽ за сессию</div>

                    <ButtonDefault disabled={false} onClick={() => navigate("/auth")}>Выбрать психолога</ButtonDefault>
                </div>

                <Illustration className={styles.Illustration} />
            </div>
        </section>
    )
}

export default Section1