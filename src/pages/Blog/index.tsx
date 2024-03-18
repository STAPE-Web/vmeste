import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ButtonRound from "@/ui/Buttons/Round"
import { ArrowLeftIcon, ArrowRightIcon, Like2Icon, LikeIcon } from "@/ui/Icons"
import ScrollTest from "@/components/ScrollTest"

const Blog = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState("Тесты")
    const tabs = ["Тесты", "Статьи", "Видео"]

    const favorite = [
        { title: "«Почему мне так плохо?». Тест на депрессию", category: "Депрессия и стресс", time: "4 мин." },
        { title: "«Почему мне так плохо?». Тест на депрессию", category: "Депрессия и стресс", time: "4 мин." },
        { title: "«Почему мне так плохо?». Тест на депрессию", category: "Депрессия и стресс", time: "4 мин." },
        { title: "«Почему мне так плохо?». Тест на депрессию", category: "Депрессия и стресс", time: "4 мин." },
        { title: "«Почему мне так плохо?». Тест на депрессию", category: "Депрессия и стресс", time: "4 мин." },
    ]

    const testList = [
        { title: "Кто вы в треугольнике Карпмана?", time: "3 минуты на прохождение" },
        { title: "Проверьте свой тип привязанности в отношениях.", time: "7 минут на прохождение" },
        { title: "«Не могу без тебя». Тест на созависимость", time: "3 минуты на прохождение" },
        { title: "Узнайте ваш язык любви.", time: "4 минуты на прохождение" },
        { title: "Узнайте ваш язык любви.", time: "4 минуты на прохождение" },
    ]

    const articleList = [
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
        { category: "Отношения", title: "Как выбраться из созависимых отношений", autor: "Анна Дегтярёва", date: "30 дек. 2023 " },
    ]

    function fillContent() {
        switch (tab) {
            case "Тесты": return <>
                <div className={styles.Box}>
                    <h3>Избранное</h3>
                    <div className={styles.ScrollBox}>
                        <div className={styles.PrevButton}>
                            <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowLeftIcon /></ButtonRound>
                        </div>

                        <div className={styles.Scroll}>
                            {favorite.map((item, index) => (
                                <div key={index} className={styles.Item} onClick={() => navigate("/test")}>
                                    <Like2Icon className={styles.LikeIcon} />
                                    <h2>{item.title}</h2>
                                    <div>
                                        <p>{item.category}</p>
                                        <p>{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.NextButton}>
                            <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowRightIcon /></ButtonRound>
                        </div>
                    </div>
                </div>

                <ScrollTest array={testList} title="Отношения" />
                <ScrollTest array={testList} title="Депрессия и стресс" />
                <ScrollTest array={testList} title="Личность и характер" />
            </>

            case "Статьи": return <div className={styles.Grid}>
                {articleList.map((item, index) => (
                    <div key={index} className={styles.GridItem}>
                        <img src="" alt="" />

                        <div className={styles.GridItemInfo}>
                            <h6>{item.category}</h6>
                            <h3>{item.title}</h3>

                            <div className={styles.GridItemAdditional}>
                                <div>
                                    <img src="" alt="" />
                                    <p>{item.autor} · {item.date}</p>
                                </div>

                                <LikeIcon />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        }
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <h2>Полезные материалы</h2>
                    </div>

                    <div className={styles.Tabs}>
                        {tabs.map((t, index) => (
                            <div key={index} className={t === tab ? styles.ActiveTab : ""} onClick={() => setTab(t)}>
                                {t}
                            </div>
                        ))}
                    </div>

                    {fillContent()}
                </div>
            </section>
        </main>
    )
}

export default Blog