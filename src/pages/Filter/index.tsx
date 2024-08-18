import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import { Add2Icon, ArrowLeftIcon } from "@/ui/Icons"
import { useEffect, useState } from "react"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"
import MobileAuthModal from "@/components/MobileAuthModal"
import CouplesModal from "@/components/CoupleModal"

const Filter = () => {
    const navigate = useNavigate()
    const typeConsultList = ["Индивидуальная", "Парная"]
    const [typeConsult, setTypeConsult] = useState("Индивидуальная")

    const sexPeopleList = ["Все равно", "Женщина", "Мужчина"]
    const [sexPeople, setSexPeople] = useState("Все равно")

    const sessionTimeList = ["Любое", "Ближайшее", "Конкретное"]
    const [sessionTime, setSessionTime] = useState("Любое")
    const currentTimeList = ["до 10:00", "10:00-18:00", "после 18:00"]
    const [MonFriTime, setMonFriTime] = useState("до 10:00")
    const [SatSunTime, setSatSunTime] = useState("до 10:00")

    const [modal, setModal] = useState(false)
    const [couplesModal, setCouplesModal] = useState(false)

    const [myCondition, setMyCondition] = useState<string[]>([])
    const [relationship, setRelationship] = useState<string[]>([])
    const [work, setWork] = useState<string[]>([])
    const [events, setEvents] = useState<string[]>([])
    const [coupleTerapy, setCoupleTerapy] = useState<string[]>([])

    const [modalMode, setModalMode] = useState(0)
    const [price, setPrice] = useState<number[]>([2300])

    const priceList = [
        { price: 2300, level: 0 },
        { price: 3500, level: 1 },
        { price: 5500, level: 2 },
        { price: 7500, level: 3 },
        { price: 13000, level: 4 },
        { price: 1000, level: 5 },
    ]

    const priceListDuo = [
        { price: 3450, level: 0 },
        { price: 5250, level: 1 },
        { price: 8250, level: 2 },
        { price: 11250, level: 3 },
        { price: 19000, level: 4 },
    ]

    const itemsList = [
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

    function SearchSpecialist() {
        const searchData = {
            familyTherapy: typeConsult === "Парная",
            themes: typeConsult === "Парная" ? coupleTerapy : [...myCondition, ...relationship, ...work, ...events],
            gender: sexPeople === "Женщина" ? "W" : "M",
            price: price.length === 0 ? [2300, 3500, 5500] : price,
            time: sessionTime,
            MFTime: MonFriTime,
            SSTime: SatSunTime
        }
        const params = `?familyTherapy=${searchData.familyTherapy}&themes=${searchData.themes.map(i => `${i}`).join("_")}&gender=${searchData.gender}&price=${searchData.price}&time=${searchData.time}${searchData.time === "Конкретное" ? `&MFTime=${searchData.MFTime}&SSTime=${searchData.SSTime}` : ""}`
        navigate(`/specialists${params}`)
    }

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [modal]);

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate("/specialists")} />
                        <h2>Анкета</h2>
                    </div>

                    <div className={styles.Box}>
                        <h3>Вид консультации</h3>
                        <div className={styles.Tabs}>
                            {typeConsultList.map((t, index) => (
                                <div key={index} className={t === typeConsult ? styles.ActiveTab : ""} onClick={() => setTypeConsult(t)}>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.Box}>
                        <h3>Темы для обсуждения</h3>
                        {typeConsult === "Парная"
                            ? <div>
                                <div className={styles.RowItems}>
                                    {coupleTerapy.map((item, index) => <div key={index}>{item}</div>)}

                                    <button className={styles.Button} onClick={() => {
                                        setCouplesModal(true)
                                    }}>
                                        <Add2Icon />
                                        {coupleTerapy.length === 0 && "Выбрать"}
                                    </button>
                                </div>
                            </div>
                            : <>
                                <div>
                                    <h5>Мое состояние</h5>
                                    <div className={styles.RowItems}>
                                        {myCondition.map((item, index) => <div key={index}>{item}</div>)}

                                        <button className={styles.Button} onClick={() => {
                                            setModal(true)
                                            setModalMode(0)
                                        }}>
                                            <Add2Icon />
                                            {myCondition.length === 0 && "Выбрать"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h5>Отношения</h5>
                                    <div className={styles.RowItems}>
                                        {relationship.map((item, index) => <div key={index}>{item}</div>)}

                                        <button className={styles.Button} onClick={() => {
                                            setModal(true)
                                            setModalMode(1)
                                        }}>
                                            <Add2Icon />
                                            {relationship.length === 0 && "Выбрать"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h5>Работа, учеба</h5>
                                    <div className={styles.RowItems}>
                                        {work.map((item, index) => <div key={index}>{item}</div>)}

                                        <button className={styles.Button} onClick={() => {
                                            setModal(true)
                                            setModalMode(2)
                                        }}>
                                            <Add2Icon />
                                            {work.length === 0 && "Выбрать"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h5>События в жизни</h5>
                                    <div className={styles.RowItems}>
                                        {events.map((item, index) => <div key={index}>{item}</div>)}

                                        <button className={styles.Button} onClick={() => {
                                            setModal(true)
                                            setModalMode(4)
                                        }}>
                                            <Add2Icon />
                                            {events.length === 0 && "Выбрать"}
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    <div className={styles.Box}>
                        <h3>Пол терапевта</h3>
                        <div className={styles.Tabs}>
                            {sexPeopleList.map((t, index) => (
                                <div key={index} className={t === sexPeople ? styles.ActiveTab : ""} onClick={() => setSexPeople(t)}>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.Box}>
                        <h3>Время сессии</h3>
                        <div className={styles.Tabs}>
                            {sessionTimeList.map((t, index) => (
                                <div key={index} className={t === sessionTime ? styles.ActiveTab : ""} onClick={() => setSessionTime(t)}>
                                    {t}
                                </div>
                            ))}
                        </div>
                        {sessionTime === "Ближайшее" && <p className={styles.MiniDescription}>Сначала будут показаны терапевты, к которым можно записаться в ближайшее время.</p>}
                        {sessionTime === "Конкретное" && <p className={styles.MiniDescription}>Сначала будут показаны терапевты, к которым можно записаться в указанное время. Больше интервалов — больше подходящих специалистов.</p>}

                        {sessionTime === "Конкретное" && <>
                            <h4>Понедельник-пятница</h4>
                            <div className={styles.Tabs}>
                                {currentTimeList.map((t, index) => (
                                    <div key={index} className={t === MonFriTime ? styles.ActiveTab : ""} onClick={() => setMonFriTime(t)}>
                                        {t}
                                    </div>
                                ))}
                            </div>
                            <h4>Суббота-воскресенье</h4>
                            <div className={styles.Tabs}>
                                {currentTimeList.map((t, index) => (
                                    <div key={index} className={t === SatSunTime ? styles.ActiveTab : ""} onClick={() => setSatSunTime(t)}>
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </>}
                    </div>

                    <div className={styles.Box}>
                        <h3>Стоимость сессии</h3>
                        <div className={styles.Grid}>
                            {typeConsult === "Индивидуальная"
                                ? <>{priceList.map((item, index) => (
                                    <div key={index} className={`${styles.GridItem} ${price.includes(item.price) ? styles.Active : ""}`} onClick={() => {
                                        if (price.includes(item.price)) {
                                            const newItem = price.filter(i => i !== item.price)
                                            setPrice(newItem)
                                        } else {
                                            setPrice(prev => [...prev, item.price])
                                        }
                                    }}>
                                        <div>
                                            <Checkbox state={price.includes(item.price)} />
                                            <h4>{item.price} ₽</h4>
                                        </div>

                                        <p>Уровень {item.level === 5 ? "Студент" : item.level}</p>
                                    </div>
                                ))}</>
                                : <>{priceListDuo.map((item, index) => (
                                    <div key={index} className={`${styles.GridItem} ${price.includes(item.price) ? styles.Active : ""}`} onClick={() => {
                                        if (price.includes(item.price)) {
                                            const newItem = price.filter(i => i !== item.price)
                                            setPrice(newItem)
                                        } else {
                                            setPrice(prev => [...prev, item.price])
                                        }
                                    }}>
                                        <div>
                                            <Checkbox state={price.includes(item.price)} />
                                            <h4>{item.price} ₽</h4>
                                        </div>

                                        <p>Уровень {item.level}</p>
                                    </div>
                                ))}</>
                            }
                        </div>
                    </div>

                    <div className={styles.ButtonBox} style={{ width: "100%" }}>
                        <ButtonDefault disabled={false} onClick={() => SearchSpecialist()}>Показать психологов</ButtonDefault>
                    </div>
                </div>
            </section>

            {modal && <div className={`${styles.Modal}`} onClick={() => setModal(false)}>
                <div className={styles.GroupItem} onClick={e => e.stopPropagation()}>
                    <h3>Какие темы хотели бы обсудить в первую очередь?</h3>
                    <p>Расскажите о своем запросе. Отмечайте всё, что у вас отзывается</p>
                    <div className={styles.CheckGroup}>
                        {itemsList.map((item, index) => (
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

                    <ButtonDefault disabled={false} onClick={() => setModal(false)}>Готово</ButtonDefault>
                </div>
            </div>}

            {couplesModal && <CouplesModal
                setModal={setCouplesModal}
                setCoupleTerapy={setCoupleTerapy}
                coupleTerapy={coupleTerapy}
            />}

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
        </main>
    )
}

export default Filter