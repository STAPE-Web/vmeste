import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Banner from "@/ui/Banner"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/ui/Icons"
import { useNavigate, useSearchParams } from "react-router-dom"
import Diary from "@/components/Diary"
import { SessionAPI, TestsAPI } from "@/api"
import { ISession, ITests } from "@/types"

const Home = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [tests, setTests] = useState<ITests[]>([])
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const items = [
        { name: "Радость", image: "/Emoji_1.png" },
        { name: "Страх", image: "/Emoji_2.png" },
        { name: "Бешенство", image: "/Emoji_3.png" },
        { name: "Грусть", image: "/Emoji_4.png" },
        { name: "Спокойствие", image: "/Emoji_5.png" },
        { name: "Сила", image: "/Emoji_6.png" },
    ]

    const sliderRef = useRef<HTMLDivElement>(null);

    const handleScroll = (scrollAmount: number) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    async function getTests() {
        const sid = JSON.parse(localStorage.getItem("sid") as string)
        const result = await TestsAPI.getAll(sid)
        setTests(result.res)
    }

    useEffect(() => {
        getTests()
    }, [])

    const [futureSessions, setFutureSessions] = useState<ISession[]>([])

    const getSession = useCallback(async () => {
        const result = await SessionAPI.get(sid)
        setFutureSessions(result.sessions.future)
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",]
        const date = new Date(value)
        const day = date.getDate()
        const month = date.getMonth()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        return `${day} ${months[month]}, ${String(hour).length === 1 ? `0${hour}` : hour}:${String(minutes).length === 1 ? `0${minutes}` : minutes}`
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    {searchParams.get("diary") === "true"
                        ? <Diary />
                        : <>
                            <div className={styles.DesctopBox}>
                                {futureSessions.filter(i => i.status !== "canceled").length !== 0
                                    ? <div className={styles.Grid}>{futureSessions.filter(i => i.status !== "canceled").map((item, index) => (
                                        <div key={index} className={styles.Item} onClick={() => navigate(`/session/${item.id}`)}>
                                            <img src={item.psychPhoto} alt="" />

                                            <div className={styles.ItemBox}>
                                                <div className={styles.RowBox}>
                                                    <h3>{item.psychName}</h3>
                                                    <ArrowRightIcon />
                                                </div>

                                                <p>{item.sessionNumber} сессия</p>

                                                <h4>{formatDate(item.dateSession)}</h4>

                                                <div className={styles.Payed}>
                                                    <CheckIcon />
                                                    Оплачено
                                                </div>
                                            </div>
                                        </div>
                                    ))}</div>
                                    : <Banner data={futureSessions} />
                                }
                            </div>

                            <div className={styles.MobileBox}>
                                <Banner data={futureSessions} />
                            </div>

                            <div className={styles.Box}>
                                <h2>Что вы чувствуете?</h2>
                                <div className={styles.Items}>
                                    {items.map((item, index) => (
                                        <div key={index} onClick={() => navigate("/?diary=true")}>
                                            <img src={item.image} alt="" />
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {tests !== undefined && <div className={styles.Box}>
                                <h2>Тесты</h2>

                                <div className={styles.SLiderBox}>
                                    <button disabled={tests?.length < 3} className={styles.ButtonLeft} onClick={() => handleScroll(-500)}>
                                        <ArrowLeftIcon />
                                    </button>
                                    <div className={styles.Slider} ref={sliderRef}>
                                        {tests?.map((item, index) => (
                                            <div key={index} onClick={() => navigate(`/test/${item.id}`)}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>

                                    <button disabled={tests.length < 3} className={styles.ButtonRight} onClick={() => handleScroll(500)}>
                                        <ArrowRightIcon />
                                    </button>
                                </div>
                            </div>}
                        </>
                    }
                </div>
            </section>
        </main>
    )
}

export default Home