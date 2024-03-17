import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Banner from "@/ui/Banner"
import { useRef } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import { useNavigate, useSearchParams } from "react-router-dom"
import Diary from "@/components/Diary"

const Home = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const items = [
        { name: "Радость", image: "/Emoji_1.png" },
        { name: "Страх", image: "/Emoji_2.png" },
        { name: "Бешенство", image: "/Emoji_3.png" },
        { name: "Грусть", image: "/Emoji_4.png" },
        { name: "Спокойствие", image: "/Emoji_5.png" },
        { name: "Сила", image: "/Emoji_6.png" },
    ]

    const tests = [
        { title: "Кто вы в треугольнике Карпмана?", color: "#92D35E" },
        { title: "Кто вы в треугольнике Карпмана?2", color: "#FF8702" },
        { title: "Кто вы в треугольнике Карпмана?3", color: "#FF5D02" },
        { title: "Кто вы в треугольнике Карпмана?4", color: "#92D35E" },
        { title: "Кто вы в треугольнике Карпмана?5", color: "#FF8702" },
        { title: "Кто вы в треугольнике Карпмана?6", color: "#FF5D02" },
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
                                    <button className={styles.ButtonLeft} onClick={() => handleScroll(-500)}>
                                        <ArrowLeftIcon />
                                    </button>
                                    <div className={styles.Slider} ref={sliderRef}>
                                        {tests.map((item, index) => (
                                            <div key={index} style={{ background: item.color }} onClick={() => navigate("/test")}>
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>

                                    <button className={styles.ButtonRight} onClick={() => handleScroll(500)}>
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