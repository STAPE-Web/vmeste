import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Banner from "@/ui/Banner"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import { useNavigate, useSearchParams } from "react-router-dom"
import Diary from "@/components/Diary"
import { SessionAPI, TestsAPI } from "@/api"
import { ISession, ITests } from "@/types"

const Home = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [tests, setTests] = useState<ITests[]>([])
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

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
            const slider = sliderRef.current;
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const checkCScroll = () => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            const scrollLeft = slider.scrollLeft;
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < maxScrollLeft - 1);
        }
    };

    useEffect(() => {
        checkCScroll();
        if (sliderRef.current) {
            sliderRef.current.addEventListener('scroll', checkCScroll);
        }

        return () => {
            if (sliderRef.current) {
                sliderRef.current.removeEventListener('scroll', checkCScroll);
            }
        };
    }, [tests]);

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

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    {searchParams.get("diary") === "true"
                        ? <Diary />
                        : <>
                            <div className={styles.DesctopBox}>
                                <Banner data={futureSessions} />
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
                                    {showLeftButton && (
                                        <button className={styles.ButtonLeft} onClick={() => handleScroll(-500)}>
                                            <ArrowLeftIcon />
                                        </button>
                                    )}
                                    <div className={styles.Slider} ref={sliderRef}>
                                        {tests?.map((item, index) => (
                                            <div key={index} onClick={() => navigate(`/test/${item.id}`)}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>

                                    {showRightButton && (
                                        <button className={styles.ButtonRight} onClick={() => handleScroll(500)}>
                                            <ArrowRightIcon />
                                        </button>
                                    )}
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