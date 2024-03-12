import ButtonRound from "@/ui/Buttons/Round"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Avatar from "@/assets/Avatar6.png"

const Section8 = () => {
    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Что о нас говорят:</h2>

                <div className={styles.Box}>
                    <div className={styles.Review}>
                        <img src={Avatar} alt="" />

                        <div className={styles.ReviewBox}>
                            <p>Мне всегда казалось, что у меня что-то не так. А год назад я поняла, что больше так не могу. Что я хочу не просто существовать, а жить в гармонии с собой. Мой терапевт от ВМЕСТЕ — очень тактичная и внимательная девушка, с ней очень комфортно работать, чувствую себя в безопасности. Мне уже удалось разобраться с давно мучившими меня отношениями, избавиться от некоторых страхов.</p>

                            <div>
                                <h3>Анастасия</h3>
                                <h4>дизайнер</h4>
                            </div>
                        </div>

                        <div className={styles.ButtonBox}>
                            <ButtonRound onClick={() => ({})} big={true} disabled={false}><ArrowLeftIcon /></ButtonRound>
                            <ButtonRound onClick={() => ({})} big={true} disabled={false}><ArrowRightIcon /></ButtonRound>
                        </div>
                    </div>

                    {/*  */}
                </div>
            </div>
        </section>
    )
}

export default Section8