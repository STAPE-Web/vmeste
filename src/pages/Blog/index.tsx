import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import React, { useCallback, useEffect, useState } from "react"
import { DotsIcon, GridIcon, LikeIcon, ListIcon, PlayIcon } from "@/ui/Icons"
import ScrollTest from "@/components/ScrollTest"
import { MaterialsAPI } from "@/api"
import { IArticle, IBlog } from "@/types"

const Blog = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState("Тесты")
    const tabs = ["Тесты", "Статьи", "Видео"]
    const [grid, setGrid] = useState(true)
    const [data, setData] = useState<IBlog | null>(null)
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const getMaterials = useCallback(async () => {
        const result = await MaterialsAPI.getAll(sid)
        setData(result.result)
    }, [sid])

    useEffect(() => {
        getMaterials()
    }, [getMaterials])

    function convertDate(value: number) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",]
        const date = new Date(value)
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        return `${day} ${months[month]} ${year}`
    }

    console.log(data)

    function fillContent() {
        switch (tab) {
            case "Тесты": return <>
                {/* <div className={styles.Box}>
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
                </div> */}

                {data !== null && Object.keys(data?.tests).map((category) => (
                    // @ts-ignore
                    <ScrollTest key={category} array={data?.tests[category]} title={category} />
                ))}
            </>

            case "Статьи": return <div className={styles.Grid}>
                {data !== null && Object.keys(data?.articles).map((category, index) => (
                    <React.Fragment key={index}>
                        {/* @ts-ignore */}
                        {data.articles[category].map((item: IArticle, i) => (
                            <div key={index} className={styles.GridItem} onClick={() => navigate(`/article/${item.id}`)}>
                                <img src={item.preview} alt="" />

                                <div className={styles.GridItemInfo}>
                                    <h6>{category}</h6>
                                    <h3>{item.title}</h3>

                                    <div className={styles.GridItemAdditional}>
                                        <div>
                                            <img src="" alt="" />
                                            <p>Анна Дегтярёва · {convertDate(item.createdAt)}</p>
                                        </div>

                                        <LikeIcon />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            case "Видео": return <div className={`${styles.Grid} ${!grid ? styles.GridList : ""}`}>
                {data?.videos.videos.map((item, index) => (
                    <div key={index} className={styles.Video} onClick={() => navigate(`/video/${item.id}`)}>
                        <div className={styles.VideoBox} style={{ background: `url(${item.preview}) no-repeat` }}>
                            <LikeIcon className={styles.Like} />
                            {/* <div>11:48</div> */}
                            <PlayIcon className={styles.Play} />
                        </div>

                        <div className={styles.VideoText}>
                            <div>
                                <h6>{item.title}</h6>
                                <h3>30 декабря 2023</h3>
                            </div>

                            <DotsIcon />
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

                    {tab === "Видео"
                        ? <div className={styles.Row}>
                            <div className={styles.Tabs}>
                                {tabs.map((t, index) => (
                                    <div key={index} className={t === tab ? styles.ActiveTab : ""} onClick={() => setTab(t)}>
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div onClick={() => setGrid(!grid)}>
                                {grid ? <GridIcon /> : <ListIcon />}
                            </div>
                        </div>
                        : <div className={styles.Tabs}>
                            {tabs.map((t, index) => (
                                <div key={index} className={t === tab ? styles.ActiveTab : ""} onClick={() => setTab(t)}>
                                    {t}
                                </div>
                            ))}
                        </div>
                    }

                    {fillContent()}
                </div>
            </section>
        </main>
    )
}

export default Blog