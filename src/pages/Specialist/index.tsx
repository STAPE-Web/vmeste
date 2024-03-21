import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, LikeIcon, ThemesIcon, VerifedIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PshycologistsAPI } from "@/api"
import { ISpecialist } from "@/types"
import Calendar from "@/components/Calendar"

const Specialist = () => {
    const { id } = useParams()
    const [data, setData] = useState<ISpecialist | null>(null)

    const [fullText, setFullText] = useState(false)
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const getSpecialist = useCallback(async () => {
        const result = await PshycologistsAPI.get(sid, { familyTherapy: true, gender: "M", prices: [2500], themes: ["Стресс"] })
        const userData = result.psychologists.find((i: ISpecialist) => i.id === id)
        setData(userData)
    }, [sid, id])

    useEffect(() => {
        getSpecialist()
    }, [getSpecialist])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",]
        const date = new Date(value)
        const day = date.getDate()
        const month = date.getMonth()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        return `${day} ${months[month]}, ${String().length !== 1 ? hour : `${hour}0`}:${String().length !== 1 ? `${minutes}0` : minutes}`
    }

    if (data === null) return

    const achive = [
        { title: "Опыт", value: `${data?.exp} лет`, icon: VerifedIcon },
        { title: "Темы", value: `${data?.sameThemesCount}/4`, icon: ThemesIcon },
    ]

    console.log(data)

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <ArrowLeftIcon width={30} height={30} style={{ color: "#D9D9D9", cursor: "pointer" }} />

                    <div className={styles.InfoBox}>
                        <div className={styles.ImageBox}>
                            <img src={data?.urlAvatar} alt="" />
                            <LikeIcon />
                        </div>

                        <div className={styles.Info}>
                            <h3>{data?.name}</h3>
                            <div>
                                <h4>Индивидуальная сессия {data?.individualSession.countTime} мин, {data?.individualSession.price} ₽</h4>
                                <h4>Запись <span>с {formatDate(data?.freeTime[0])}</span></h4>
                            </div>

                            <div className={styles.Achive}>
                                {achive.map((item, idnex) => (
                                    <div key={idnex} className={styles.AchiveItem}>
                                        <item.icon />
                                        <div>
                                            <h4>{item.title}</h4>
                                            <p>{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.About}>
                                <h2>О себе</h2>
                                <p className={fullText ? styles.FullText : ""}>{data?.description}</p>
                                {data?.description.length > 322 && <h5 onClick={() => setFullText(!fullText)}>{fullText ? "Свернуть" : "Читать полностью"}</h5>}
                            </div>
                        </div>
                    </div>

                    <div className={styles.ChooseSession}>
                        <h2>Выбрать время сессии</h2>
                        <Calendar />
                    </div>

                    <div className={styles.ButtonBox}>
                        <ButtonDefault disabled={false} onClick={() => ({})}>Записаться и оплатить</ButtonDefault>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Specialist