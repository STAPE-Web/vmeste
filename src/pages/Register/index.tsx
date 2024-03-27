import { useEffect, useState } from "react"
import styles from "./style.module.css"
import StepLine from "@/ui/StepLine"
import ButtonRound from "@/ui/Buttons/Round"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import Input from "@/ui/Input"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"
import MobileBox from "@/components/MobileBox"
import { AuthAPI } from "@/api"

const Register = () => {
    const [step, setStep] = useState(1)
    const [disable, setDisable] = useState(false)
    const [endRegister, setEndRegister] = useState(false)

    const [username, setUsername] = useState("")
    const [age, setAge] = useState("")

    const [experience, setExperience] = useState("")
    const [forWho, setForWho] = useState("")
    const [people, setPeople] = useState("")

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

    function checkItem(item: string, func: React.Dispatch<React.SetStateAction<string[]>>, state: string[]) {
        if (state.includes(item)) {
            func(state.filter(i => i !== item))
        } else {
            func(prev => [...prev, item])
        }
    }

    function fillContent() {
        switch (step) {
            case 1: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <h3>Как вас зовут?</h3>
                    <p>Ваше имя или псевдоним будет доступно вашему психологу</p>
                    <div className={styles.InputBox}>
                        <Input onChange={e => setUsername(e.target.value)} placeholder="Введите имя" type="text" value={username} />
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <h3>Сколько вам лет?</h3>
                    <p>Для получения услуги на нашем сервисе вам должно быть больше 18 лет</p>
                    <div className={styles.InputBox}>
                        <Input onChange={e => setAge(e.target.value)} placeholder="Ваш возраст" type="number" value={age} />
                    </div>
                </div>
            </div>

            case 2: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <h3>Был ли у вас опыт в терапии?</h3>
                    <p>Эта информация может пригодиться специалисту</p>
                    <div className={styles.RowBox}>
                        {["Я новичок", "Есть опыт"].map((item, index) => (
                            <div className={`${styles.OutlineItem} ${item === experience ? styles.Active : ""}`} key={index} onClick={() => setExperience(item)}>{item}</div>
                        ))}
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <h3>Для кого ищете специалиста?</h3>
                    <p>У нас можно консультироваться с психологом как индивидуально, так и вдвоём: с вашим партнером или членом семьи</p>
                    <div className={styles.RowBox}>
                        {["Для себя", "Для двоих"].map((item, index) => (
                            <div className={`${styles.OutlineItem} ${item === forWho ? styles.Active : ""}`} key={index} onClick={() => setForWho(item)}>{item}</div>
                        ))}
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <h3>С кем было бы комфортнее работать?</h3>
                    <div className={styles.RowBox}>
                        {["С мужчиной", "С женщиной", "Не важно"].map((item, index) => (
                            <div className={`${styles.OutlineItem} ${item === people ? styles.Active : ""}`} key={index} onClick={() => setPeople(item)}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>

            case 3: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <h3>Какие темы хотели бы обсудить в первую очередь?</h3>
                    <p>Расскажите о своем запросе. Отмечайте всё, что у вас отзывается</p>
                    <div className={styles.CheckGroup}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.CheckGroupItem}>
                                <h2>{item.title}</h2>
                                <div className={styles.CheckArray}>
                                    {item.array.map((arr, id) => (
                                        <div key={id} onClick={() => checkItem(arr, item.func, item.state)}>
                                            <Checkbox state={item.state.includes(arr)} />
                                            <p>{arr}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
    }

    useEffect(() => {
        if (step === 1) setDisable(username === "" || age === "" || Number(age) < 18)
        if (step === 2) setDisable(experience === "" || forWho === "" || people === "")
        if (step === 3) setDisable([...myCondition, ...relationship, ...work, ...events].length === 0)
    }, [username, age, step, experience, forWho, people, myCondition, relationship, work, events])

    const themeList = [
        { title: "Моё состояние", image: "/Register_1.png" },
        { title: "Отношения", image: "/Register_2.png" },
        { title: "Работа, учеба", image: "/Register_3.png" },
        { title: "События в жизни", image: "/Register_4.png" },
    ]

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
        <main className={styles.Page}>
            <div className={styles.Box}>
                <StepLine max={3} value={step} />
                {endRegister
                    ? <div className={styles.Group}>
                        <div className={styles.GroupItem}>
                            <h3>Какие темы хотели бы обсудить в первую очередь?</h3>
                            <p>Расскажите о своем запросе. Отмечайте всё, что у вас отзывается</p>
                        </div>

                        <div className={styles.Row}>
                            {themeList.map((item, index) => (
                                <div key={index} className={`${styles.RowItem}`} onClick={() => setEndRegister(false)}>
                                    <div>{items[index].state.length}</div>
                                    <img src={item.image} alt="" />
                                    <h4>{item.title}</h4>
                                </div>
                            ))}
                        </div>

                        <ButtonDefault disabled={false} onClick={() => Auth()}>Завершить регистрацию</ButtonDefault>
                    </div>
                    : <>
                        {fillContent()}
                        <div className={styles.Controlls}>
                            {step === 1
                                ? <div></div>
                                : <ButtonRound onClick={() => setStep(step - 1)} disabled={false} big={true}>
                                    <ArrowLeftIcon />
                                </ButtonRound>
                            }

                            <ButtonRound onClick={() => step === 3 ? setEndRegister(true) : setStep(step + 1)} disabled={disable} big={true}>
                                <ArrowRightIcon />
                            </ButtonRound>
                        </div>
                    </>
                }
            </div>

            <MobileBox />
        </main>
    )
}

export default Register