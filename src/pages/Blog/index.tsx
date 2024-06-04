import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import React, { useCallback, useEffect, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, DotsIcon, GridIcon, Like2Icon, LikeIcon, ListIcon, PlayIcon } from "@/ui/Icons"
import ScrollTest from "@/components/ScrollTest"
import { MaterialsAPI } from "@/api"
import { IArticle, IBlog, ITests } from "@/types"
import ButtonRound from "@/ui/Buttons/Round"
import PsychSidebar from "@/components/PsyhSidebar"

const Blog = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState("Тесты")
    const tabs = ["Тесты", "Статьи", "Видео"]
    const [grid, setGrid] = useState(true)
    const [data, setData] = useState<IBlog | null>(null)
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const userType = localStorage.getItem("userType")

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = '';
        };
    }, []);

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

    async function removeLike(id: string, type: "tests" | "articles" | "videos") {
        await MaterialsAPI.like(sid, "delete", type, id)
        await getMaterials()
    }

    async function addLike(id: string, type: "tests" | "articles" | "videos") {
        const result = await MaterialsAPI.like(sid, "add", type, id)
        console.log(result)
        await getMaterials()
    }

    // if (data === null) return;

    const favoriteTestsExist = data !== null && data !== undefined && Object.keys(data?.tests).some(category =>
        // @ts-ignore
        data?.tests[category].some((i: ITests) => i.isFavorite)
    );

    const favoriteArticlesExist = data !== null && data !== undefined && Object.keys(data?.articles).some(category =>
        // @ts-ignore
        data?.articles[category].some((i: ITests) => i.isFavorite)
    );

    function fillContent() {
        switch (tab) {
            case "Тесты": return <>
                {favoriteTestsExist && <div className={styles.Box}>
                    <h3>Избранное</h3>
                    <div className={styles.ScrollBox}>
                        <div className={styles.PrevButton}>
                            <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowLeftIcon /></ButtonRound>
                        </div>

                        <div className={styles.Scroll}>
                            {/* @ts-ignore */}
                            {Object.keys(data?.tests).map((category, id) => (
                                <React.Fragment key={id}>
                                    {/* @ts-ignore */}
                                    {data?.tests[category].filter((i: ITests) => i.isFavorite).map((item: ITests, index) => (
                                        <div key={index} className={styles.Item} onClick={() => navigate(`/test/${item.id}`)}>
                                            <Like2Icon onClick={(e: any) => {
                                                e.stopPropagation()
                                                removeLike(item.id, "tests")
                                            }} className={styles.LikeIcon} />
                                            <h2>{item.name}</h2>
                                            <div>
                                                <p>{category}</p>
                                                <p>{item.countTime} мин.</p>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className={styles.NextButton}>
                            <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowRightIcon /></ButtonRound>
                        </div>
                    </div>
                </div>}

                {data !== null && Object.keys(data?.tests).map((category) => (
                    // @ts-ignore
                    <ScrollTest getMaterials={getMaterials} key={category} array={data?.tests[category]} title={category} />
                ))}
            </>

            case "Статьи": return <>
                {favoriteArticlesExist && <><h3 className={styles.Title}>Избранное</h3>
                    <div className={`${styles.Grid} ${styles.Favorite}`}>
                        {/* @ts-ignore */}
                        {Object.keys(data?.articles).map((category, id) => (
                            <React.Fragment key={id}>
                                {/* @ts-ignore */}
                                {data?.articles[category].filter((i: IArticle) => i.isFavorite).map((item: IArticle, index) => (
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

                                                <Like2Icon onClick={(e: any) => {
                                                    e.stopPropagation()
                                                    removeLike(item.id, "articles")
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div></>}

                <div className={styles.Grid}>
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

                                            {item.isFavorite
                                                ? <Like2Icon onClick={(e: any) => {
                                                    e.stopPropagation()
                                                    removeLike(item.id, "articles")
                                                }} />
                                                : <LikeIcon onClick={(e: any) => {
                                                    e.stopPropagation()
                                                    addLike(item.id, "articles")
                                                }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </>

            case "Видео": return <>
                {data?.videos.videos.filter(i => i.isFavorite).length !== 0 && <>
                    <h3 className={styles.Title}>Избранное</h3>
                    <div className={`${styles.Grid} ${styles.Favorite} ${!grid ? styles.GridList : ""}`}>
                        {data?.videos.videos.filter(i => i.isFavorite).map((item, index) => (
                            <div key={index} className={styles.Video} onClick={() => navigate(`/video/${item.id}`)}>
                                <div className={styles.VideoBox} style={{ background: `url(${item.preview}) no-repeat` }}>
                                    <Like2Icon onClick={(e: any) => {
                                        e.stopPropagation()
                                        removeLike(item.id, "videos")
                                    }} className={styles.Like} />

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
                </>}

                <div className={`${styles.Grid} ${!grid ? styles.GridList : ""}`}>
                    {data?.videos.videos.map((item, index) => (
                        <div key={index} className={styles.Video} onClick={() => navigate(`/video/${item.id}`)}>
                            <div className={styles.VideoBox} style={{ background: `url(${item.preview}) no-repeat` }}>
                                {item.isFavorite
                                    ? <Like2Icon onClick={(e: any) => {
                                        e.stopPropagation()
                                        removeLike(item.id, "videos")
                                    }} className={styles.Like} />
                                    : <LikeIcon onClick={(e: any) => {
                                        e.stopPropagation()
                                        addLike(item.id, "videos")
                                    }} className={styles.Like} />
                                }
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
            </>
        }
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {userType ? <PsychSidebar /> : <Sidebar />}

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