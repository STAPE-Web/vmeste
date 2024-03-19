import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Banner from "@/ui/Banner"
import { useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import { useNavigate, useSearchParams } from "react-router-dom"
import Diary from "@/components/Diary"
import { TestsAPI } from "@/api"
import { ITests } from "@/types"

const Home = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [tests, setTests] = useState<ITests[]>([])

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

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    {searchParams.get("diary") === "true"
                        ? <Diary />
                        : <>
                            <Banner />

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

                            <div className={styles.Box}>
                                <h2>Тесты</h2>

                                <div className={styles.SLiderBox}>
                                    <button disabled={tests.length < 3} className={styles.ButtonLeft} onClick={() => handleScroll(-500)}>
                                        <ArrowLeftIcon />
                                    </button>
                                    <div className={styles.Slider} ref={sliderRef}>
                                        {tests.map((item, index) => (
                                            <div key={index} onClick={() => navigate("/test")}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>

                                    <button disabled={tests.length < 3} className={styles.ButtonRight} onClick={() => handleScroll(500)}>
                                        <ArrowRightIcon />
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </section>
        </main>
    )
}

export default Home