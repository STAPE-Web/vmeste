import { ArrowLeftIcon, CheckIcon, CloseIcon } from '@/ui/Icons'
import styles from './style.module.css'
import ButtonDefault from '@/ui/Buttons/Default'
import { useState } from 'react'
import StepLine from '@/ui/StepLine'
import { useNavigate } from 'react-router-dom'

const Test = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState("")
    const questions = ["Совершенно не согласен", "Не согласен", "Скорее не согласен", "Не могу определиться", "Скорее согласен", "Согласен", "Полностью согласен"]

    function fillContent() {
        switch (step) {
            case 0: return <>
                <div className={styles.Top}>
                    <p>3 минуты на прохождение</p>
                    <CloseIcon onClick={() => navigate("/")} />
                </div>

                <div className={styles.Box}>
                    <h2>Кто вы в треугольнике Карпмана?</h2>
                    <p>Взаимодействуя с людьми, мы часто оказываемся в ловушке: наши паттерны поведения вынуждают нас бессознательно примерять на себя разные роли. <br /> Американский психолог Стивен Карпман разработал модель, позволяющую распознать и проанализировать подобные психологические игры. Он выделил три роли, которые впоследствии выстроились в известный многим треугольник Карпмана.<br /> А как в отношениях с людьми позиционируете себя вы? Какая роль ваша: Жертва, Преследователь или Спасатель? Узнайте ответ в конце теста.</p>
                    <ButtonDefault disabled={false} onClick={() => setStep(1)}>Начать тест</ButtonDefault>
                </div>
            </>

            case step > 0 && step < 19 ? step : 1: return <>
                <div className={styles.Box}>
                    <div className={styles.ButtonGrid}>
                        {questions.map((item, index) => (
                            <div className={`${styles.CheckButton} ${item === answers ? styles.Active : ""}`} key={index} onClick={() => setAnswers(item)}>
                                {item}
                                <div><CheckIcon /></div>
                            </div>
                        ))}
                    </div>

                    <ButtonDefault disabled={false} onClick={() => setStep(19)}>Далее</ButtonDefault>
                </div>
            </>

            case 19: return <>
                <div className={styles.Top}>
                    <p>Ваш результат</p>
                    <CloseIcon onClick={() => navigate("/")} />
                </div>

                <div className={styles.Box}>
                    <h2>Жертва</h2>
                    <p>Жертвы высказывают свою беспомощность и притесненность и ощущают, что с ними происходили и будут происходить нежелательные и неконтролируемые события. <br />
                        Хотя люди, берущие на себя эту роль, могут быть или не быть настоящими жертвами, эти люди считают, что они неспособны принимать решения, испытывают трудности с решением своих проблем и ощущают бессилие перед другими. Для них характерны негативные переживания и депрессивные состояния. Жертвенность порождает болезненные эмоциональные переживания, в том числе тревогу, страх, безысходность, печаль.<br />
                        В динамике драматического треугольника каждый сценарий конфликта требует, чтобы человек взял на себя роль Жертвы, потому что Жертвы получают обвинения от Преследователя и помощь от Спасателя.</p>
                </div>
            </>
        }
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {step !== 0 && step !== 19 && <div className={styles.Controlls}>
                    <div className={styles.Group}>
                        <div onClick={() => setStep(step - 1)} className={styles.Back}><ArrowLeftIcon /> Назад</div>
                        <p>{step}/18</p>
                        <div className={styles.Close}>
                            <CloseIcon onClick={() => navigate("/")} />
                        </div>
                    </div>

                    <StepLine max={18} value={step} />

                    <h3>Я чувствую себя беспомощным <br /> среди людей.</h3>
                </div>}

                {fillContent()}
            </section>
        </main >
    )
}

export default Test