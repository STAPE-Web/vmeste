import { useState } from "react"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import StepLine from "@/ui/StepLine"
import { useNavigate } from "react-router-dom"
import Input from "@/ui/Input"
import ButtonRound from "@/ui/Buttons/Round"
import MobileAuthModal from "../MobileAuthModal"
import ButtonDefault from "@/ui/Buttons/Default"
import { AuthAPI } from "@/api"

const MobileBox = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)

    const [username, setUsername] = useState("")
    const [age, setAge] = useState("")

    const [experience, setExperience] = useState("")
    const [forWho, setForWho] = useState("")
    const [people, setPeople] = useState("")

    const [modal, setModal] = useState(false)
    const [modalMode, setModalMode] = useState(0)

    const themeList = [
        { title: "Моё состояние", image: "/Register_1.png" },
        { title: "Отношения", image: "/Register_2.png" },
        { title: "Работа, учеба", image: "/Register_3.png" },
        { title: "События в жизни", image: "/Register_4.png" },
    ]

    const [myCondition, setMyCondition] = useState<string[]>([])
    const [relationship, setRelationship] = useState<string[]>([])
    const [work, setWork] = useState<string[]>([])
    const [events, setEvents] = useState<string[]>([])

    const items = [
        { title: "Моё состояние", state: myCondition, func: setMyCondition, array: ["Стресс", "Упадок сил", "Нестабильная самооценка", "Приступы страха и тревоги", "Перепады настроения", "Раздражительность", "Ощущение одиночества", "Проблемы с концентрацией", "Эмоциональная зависимость", "Проблемы со сном", "Расстройство пищевого поведения", "Панические атаки", "Навязчивые мысли о здоровье", "Сложности с алкоголем/наркотиками"] },
        { title: "Отношения", state: relationship, func: setRelationship, array: ["С партнером", "С окружающими", "С родителями", "С детьми", "Сексуальные", "Сложности с ориентацией, ее поиск"] },
        { title: "Работа, учеба", state: work, func: setWork, array: ["Недостаток мотивации", "Выгорание", "«Не знаю, чем хочу заниматься»", "Прокрастинация", "Отсутствие цели", "Смена, потеря работы"] },
        { title: "События в жизни", state: events, func: setEvents, array: ["Переезд, эмиграция", "Беременность, рождение ребёнка", "Разрыв отношений, развод", "Финансовые изменения", "Утрата близкого человека", "Болезнь, своя и близких", "Насилие"] }
    ]

    function fillContent() {
        switch (step) {
            case 1: return <div className={styles.Box}>
                <p>{step}/6</p>
                <h2>Давайте знакомиться! Как вас зовут?</h2>
                <p>Ваше имя или псевдоним будет доступно вашему психологу</p>
                <div className={styles.Row}>
                    <Input onChange={e => setUsername(e.target.value)} placeholder="Введите имя" type="text" value={username} />
                    <ButtonRound big={false} disabled={username === ""} onClick={() => setStep(2)}>
                        <ArrowRightIcon />
                    </ButtonRound>
                </div>
            </div>

            case 2: return <div className={styles.Box}>
                <p>{step}/6</p>
                <h2>Сколько вам лет?</h2>
                <p>Для получения услуги на нашем сервисе вам должно быть больше 16 лет</p>
                <div className={styles.Row}>
                    <Input onChange={e => setAge(e.target.value)} placeholder="Ваш возраст" type="number" value={age} />
                    <ButtonRound big={false} disabled={age === "" || Number(age) < 18} onClick={() => setStep(3)}>
                        <ArrowRightIcon />
                    </ButtonRound>
                </div>
            </div>

            case 3: return <div className={styles.Box}>
                <p>{step}/6</p>
                <h2>Был ли у вас опыт в терапии?</h2>
                <p>Эта информация может пригодиться специалисту</p>
                <div className={styles.Row}>
                    {["Я новичок", "Есть опыт"].map((item, index) => (
                        <div className={`${styles.OutlineItem} ${item === experience ? styles.Active : ""}`} key={index} onClick={() => {
                            setExperience(item)
                            setStep(4)
                        }}>{item}</div>
                    ))}
                </div>
            </div>

            case 4: return <div className={styles.Box}>
                <p>{step}/6</p>
                <h2>С кем было бы комфортнее работать?</h2>
                <div className={styles.Row}>
                    {["С мужчиной", "С женщиной", "Не важно"].map((item, index) => (
                        <div className={`${styles.OutlineItem} ${item === people ? styles.Active : ""}`} key={index} onClick={() => {
                            setPeople(item)
                            setStep(5)
                        }}>{item}</div>
                    ))}
                </div>
            </div>

            case 5: return <div className={styles.Box}>
                <p>{step}/6</p>
                <h2>Для кого ищете специалиста?</h2>
                <p>У нас можно консультироваться с психологом как индивидуально, так и вдвоём: с вашим партнером или членом семьи</p>
                <div className={styles.Row}>
                    {["Для себя", "Для двоих"].map((item, index) => (
                        <div className={`${styles.OutlineItem} ${item === forWho ? styles.Active : ""}`} key={index} onClick={() => {
                            setForWho(item)
                            setStep(6)
                        }}>{item}</div>
                    ))}
                </div>
            </div>

            case 6: return <div className={styles.Box}>
                <p>{step}/6</p>
                <h2>Какие темы хотели бы обсудить в первую очередь?</h2>
                <p>Расскажите о своем запросе. Отмечайте всё, что у вас отзывается</p>
                <div className={styles.Scroll}>
                    {themeList.map((item, index) => (
                        <div key={index} className={styles.ScrollItem} onClick={() => {
                            setModal(true)
                            setModalMode(index)
                        }}>
                            {items[index].state.length !== 0 && <div>{items[index].state.length}</div>}
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </div>
                    ))}
                </div>
                <ButtonDefault disabled={false} onClick={() => Auth()}>Готово</ButtonDefault>
            </div>
        }
    }

    async function Auth() {
        const data = {
            sid: JSON.parse(localStorage.getItem("sid") as string),
            name: username,
            age: age,
            therapyExperience: experience === "Есть опыт",
            gender: people === "С женщиной" ? "W" : "M",
            familyTherapy: forWho === "Для двоих",
            themes: [...myCondition, ...relationship, ...work, ...events]
        }

        const result = await AuthAPI.register(data)
        console.log(result)
        if (result.status === 200) {
            window.location.replace("/")
        } else {
            alert(result.msg)
        }
    }

    return (
        <div className={styles.MobileBox} >
            <div className={styles.Header}>
                <ArrowLeftIcon onClick={() => step === 1 ? navigate("/auth") : setStep(step - 1)} />
                <StepLine max={6} value={step} />
                <span></span>
            </div>

            {fillContent()}

            <div className={styles.Empty}></div>

            {modal && <MobileAuthModal
                modalMode={modalMode}
                setModal={setModal}

                myCondition={myCondition}
                setMyCondition={setMyCondition}
                relationship={relationship}
                setRelationship={setRelationship}
                work={work}
                setWork={setWork}
                events={events}
                setEvents={setEvents}
            />}
        </div>
    )
}

export default MobileBox