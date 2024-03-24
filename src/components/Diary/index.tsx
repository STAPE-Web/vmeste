import { ArrowLeftIcon, Calendar2Icon, CloseIcon, DiaryIcon, StatsIcon } from "@/ui/Icons"
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
    const [calendar, setCalendar] = useState(false)

    const [tab, setTab] = useState("Дневник настроения")
    const tabs = [
        { name: "Дневник настроения", icon: DiaryIcon },
        { name: "Статистика", icon: StatsIcon },
    ]

    const [howFeel, setHowFeel] = useState("")
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

    const [tab2, setTab2] = useState("ДН")
    const tabs2 = ["ДН", "НЕД", "МЕС", "ГОД"]

    const daysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getMonthName = (month: number): string => {
        const monthNames: string[] = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];
        return monthNames[month];
    };

    const renderDays = (month: number, year: number): JSX.Element[] => {
        const totalDays: number = daysInMonth(month, year);
        const currentDate: Date = new Date();
        const daysArray: JSX.Element[] = [];
        for (let i = 1; i <= totalDays; i++) {
            const date: Date = new Date(year, month, i);
            const isActiveDay: boolean = date.toDateString() === currentDate.toDateString();
            daysArray.push(
                <span key={i} className={isActiveDay ? styles.ActiveDay : ''}>
                    {i}
                </span>
            );
        }
        return daysArray;
    };

    return (
        <div className={styles.Diary}>
            {calendar
                ? <>
                    <div className={styles.Top}>
                        <CloseIcon className={styles.CloseIcon} onClick={() => setCalendar(false)} />

                        <p>Сегодня</p>
                    </div>

                    <h6>{new Date().getFullYear()}</h6>

                    <div className={styles.Clanedar}>
                        {Array.from({ length: 12 }, (_, month) => (
                            <div key={month} className={styles.ClanedarItem}>
                                <h5>{new Date().getFullYear()}</h5>
                                <h3>{getMonthName(month)}</h3>
                                <div className={styles.Month}>
                                    {renderDays(month, new Date().getFullYear())}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                : <>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate("/")} />

                        <p>{day} {months[month - 1]} {hour}:{minutes}</p>

                        <Calendar2Icon onClick={() => setCalendar(true)} />
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
                                        <div className={item.name === howFeel ? styles.ActiveFeel : ""} key={index} onClick={() => setHowFeel(item.name)}>
                                            <img src={item.image} alt="" />
                                            {item.name}
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.AdditionalItems}>
                                    {addItems.map((item, index) => (
                                        <div className={item === howFeel ? styles.ActiveFeel : ""} onClick={() => setHowFeel(item)} key={index}>{item}</div>
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
                </>
            }
        </div>
    )
}

export default Diary