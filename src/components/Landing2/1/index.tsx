import ButtonDefault from "@/ui/Buttons/Default"
import styles from "./style.module.css"
import { GoalIcon, LikeIcon, PeopleIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import Illustration4 from "@/assets/Illustration4"

const Section1 = () => {
    const navigate = useNavigate()
    const items = [
        { name: "поддержка", icon: LikeIcon },
        { name: "обмен опытом", icon: PeopleIcon },
        { name: "возможности", icon: GoalIcon },
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

                    <h1>Станьте частью <span>команды</span></h1>
                    <h3>Мы ищем единомышленников, с которыми <br /> будем вместе поддерживать высокое качество<br /> психотерапии на сервисе.</h3>

                    <div className={styles.Price}>1500+ психологов ВМЕСТЕ</div>

                    <ButtonDefault disabled={false} onClick={() => navigate("/auth/psychologist")}>Подать заявку</ButtonDefault>
                </div>

                <Illustration4 className={styles.Illustration} />
            </div>
        </section>
    )
}

export default Section1