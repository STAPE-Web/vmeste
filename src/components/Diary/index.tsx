import { ArrowLeftIcon, Calendar2Icon, DiaryIcon, StatsIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { useState } from "react"
import ButtonDefault from "@/ui/Buttons/Default"
import Range from "@/ui/Range"
import { useNavigate } from "react-router-dom"
import MoodScale from "../MoodScale"
import Chart from "../Chart"

const Diary = () => {
    const navigate = useNavigate()
    const date = new Date()
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const month = date.getMonth()
    const day = date.getDate()
    const hour = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours()
    const minutes = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes()

    const [tab, setTab] = useState("Дневник настроения")
    const tabs = [
        { name: "Дневник настроения", icon: DiaryIcon },
        { name: "Статистика", icon: StatsIcon },
    ]

    const items = [
        { name: "Радость", image: "/Emoji_1.png" },
        { name: "Страх", image: "/Emoji_2.png" },
        { name: "Бешенство", image: "/Emoji_3.png" },
        { name: "Грусть", image: "/Emoji_4.png" },
        { name: "Спокойствие", image: "/Emoji_5.png" },
        { name: "Сила", image: "/Emoji_6.png" },
    ]

    const addItems = ["Возбуждение", "Восторг", "Игривость", "Наслаждение", "Очарование", "Осознанность", "Смелость", "Удовольствие", "Чувственность", "Энергичность", "Экстравагантность"]
    const [stress, setStress] = useState(50)
    const [selfRate, setSeltRate] = useState(50)
    const [note, setNote] = useState("Сегодня я чувствую себя хорошо")

    const [tab2, setTab2] = useState("Дн")
    const tabs2 = ["Дн", "Нед", "Мес", "Год"]

    return (
        <div className={styles.Diary}>
            <div className={styles.Top}>
                <ArrowLeftIcon onClick={() => navigate("/")} />

                <p>{day} {months[month - 1]} {hour}:{minutes}</p>

                <Calendar2Icon />
            </div>

            <div className={styles.Tabs}>
                {tabs.map((t, index) => (
                    <div key={index} className={t.name === tab ? styles.ActiveTab : ""} onClick={() => setTab(t.name)}>
                        <t.icon />
                        {t.name}
                    </div>
                ))}
            </div>

            {tab === "Дневник настроения"
                ? <>
                    <div className={styles.Block}>
                        <h2>Что чувствуешь?</h2>
                        <div className={styles.Items}>
                            {items.map((item, index) => (
                                <div key={index} onClick={() => ({})}>
                                    <img src={item.image} alt="" />
                                    {item.name}
                                </div>
                            ))}
                        </div>

                        <div className={styles.AdditionalItems}>
                            {addItems.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.Block}>
                        <h2>Уровень стресса</h2>
                        <Range setValue={setStress} value={stress} array={["Низкий", "Высокий"]} />
                    </div>

                    <div className={styles.Block}>
                        <h2>Самооценка</h2>
                        <Range setValue={setSeltRate} value={selfRate} array={["Неуверенность", "Уверенность"]} />
                    </div>

                    <div className={styles.Block}>
                        <h2>Заметки</h2>
                        <textarea value={note} onChange={e => setNote(e.target.value)} className={styles.Textarea}></textarea>
                    </div>

                    <ButtonDefault disabled={false} onClick={() => ({})}>Сохранить</ButtonDefault>
                </>
                : <>
                    <div className={styles.Tabs}>
                        {tabs2.map((t, index) => (
                            <div key={index} className={t === tab2 ? styles.ActiveTab : ""} onClick={() => setTab2(t)}>
                                {t}
                            </div>
                        ))}
                    </div>

                    <div className={styles.Block}>
                        <h2>Шкала настроения</h2>
                        <MoodScale />
                    </div>

                    <div className={styles.Block}>
                        <h2>Уровень стресса</h2>
                        <Chart array={[1, 3, 4, 5, 2, 4, 3]} />
                    </div>

                    <div className={styles.Block}>
                        <h2>Самооценка</h2>
                        <Chart array={[]} />
                    </div>
                </>
            }
        </div>
    )
}

export default Diary