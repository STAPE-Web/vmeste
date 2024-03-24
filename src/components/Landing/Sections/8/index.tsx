import ButtonRound from "@/ui/Buttons/Round"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Avatar from "@/assets/Avatar6.png"
import Avatar2 from "@/assets/Avatar5.png"
import Avatar3 from "@/assets/Avatar4.png"
import { useState } from "react"

const Section8 = () => {
    const [active, setActive] = useState(0)
    const reviews = [
        { avatar: Avatar, name: "Анастасия", role: "Дизайнер", text: "Мне всегда казалось, что у меня что-то не так. А год назад я поняла, что больше так не могу. Что я хочу не просто существовать, а жить в гармонии с собой. Мой терапевт от ВМЕСТЕ — очень тактичная и внимательная девушка, с ней очень комфортно работать, чувствую себя в безопасности. Мне уже удалось разобраться с давно мучившими меня отношениями, избавиться от некоторых страхов." },
        { avatar: Avatar2, name: "Наталья", role: "Дизайнер", text: "Мне всегда казалось, что у меня что-то не так. А год назад я поняла, что больше так не могу. Что я хочу не просто существовать, а жить в гармонии с собой. Мой терапевт от ВМЕСТЕ — очень тактичная и внимательная девушка, с ней очень комфортно работать, чувствую себя в безопасности. Мне уже удалось разобраться с давно мучившими меня отношениями, избавиться от некоторых страхов." },
        { avatar: Avatar3, name: "Михаил", role: "Дизайнер", text: "Мне всегда казалось, что у меня что-то не так. А год назад я поняла, что больше так не могу. Что я хочу не просто существовать, а жить в гармонии с собой. Мой терапевт от ВМЕСТЕ — очень тактичная и внимательная девушка, с ней очень комфортно работать, чувствую себя в безопасности. Мне уже удалось разобраться с давно мучившими меня отношениями, избавиться от некоторых страхов." },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Что о нас говорят:</h2>

                <div className={styles.Box}>
                    <div className={styles.Review}>
                        <div className={styles.AvatarBox}>
                            <img src={reviews[active].avatar} alt="" />

                            <div>
                                <h3>{reviews[active].name}</h3>
                                <h4>{reviews[active].role}</h4>
                            </div>
                        </div>

                        <div className={styles.ReviewBox}>
                            <p>{reviews[active].text}</p>

                            <div>
                                <h3>{reviews[active].name}</h3>
                                <h4>{reviews[active].role}</h4>
                            </div>
                        </div>

                        <div className={styles.ButtonBox}>
                            <ButtonRound onClick={() => setActive(active - 1)} big={true} disabled={active === 0}><ArrowLeftIcon /></ButtonRound>
                            <ButtonRound onClick={() => setActive(active + 1)} big={true} disabled={active === reviews.length - 1}><ArrowRightIcon /></ButtonRound>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section8