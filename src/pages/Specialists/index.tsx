import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, FilterIcon, Like2Icon, LikeIcon, ThemesIcon, VerifedIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import ButtonRound from "@/ui/Buttons/Round"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PshycologistsAPI } from "@/api"
import { ISpecialist } from "@/types"

const Specialists = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<ISpecialist[]>([])
    const [currentPeople, setCurrentPeople] = useState(0)

    const [fullText, setFullText] = useState(false)
    const [education, setEducation] = useState(false)
    const [methods, setMethods] = useState(false)
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const getSpecialist = useCallback(async () => {
        const result = await PshycologistsAPI.get(sid, { familyTherapy: true, gender: "M", prices: [2500], themes: ["Стресс"] })
        setData(result.psychologists)
    }, [sid])

    useEffect(() => {
        getSpecialist()
    }, [getSpecialist])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const [datePart, timePart] = value.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");

        const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

        const formattedDay = formattedDate.getDate();
        const formattedMonth = formattedDate.getMonth();
        const formattedHour = formattedDate.getHours();
        const formattedMinutes = formattedDate.getMinutes();

        return `${formattedDay} ${months[formattedMonth]}, ${String(formattedHour).padStart(2, '0')}:${String(formattedMinutes).padStart(2, '0')}`;
    }

    if (data.length === 0) return

    const achive = [
        { title: "Опыт", value: `${data[currentPeople].exp} лет`, icon: VerifedIcon },
        { title: "Темы", value: `${data[currentPeople].sameThemesCount}/4`, icon: ThemesIcon },
    ]

    async function toggleLike(id: string, action: "add" | "delete", type: "psychologists") {
        await PshycologistsAPI.like(sid, action, type, id)
        await getSpecialist()
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <h2 className={styles.Title}>Выбор специалиста</h2>

                    <div className={styles.SpecialistsBox}>
                        <div className={styles.Avatars}>
                            {data.map((item, index) => (
                                <img src={item.urlAvatar} key={index} alt="" />
                            ))}
                        </div>

                        <FilterIcon onClick={() => navigate("/filter")} />
                    </div>

                    <div className={styles.InfoBox}>
                        <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowLeftIcon /></ButtonRound>

                        <div className={styles.ImageBox}>
                            <img src={data[currentPeople].urlAvatar} alt="" />
                            {data[currentPeople].isFavourite
                                ? <Like2Icon onClick={() => toggleLike(data[currentPeople].id, "delete", "psychologists")} />
                                : <LikeIcon onClick={() => toggleLike(data[currentPeople].id, "add", "psychologists")} />
                            }
                        </div>

                        <div className={styles.Info}>
                            <h3>{data[currentPeople].name}</h3>
                            <div>
                                <h4>Индивидуальная сессия {data[currentPeople].individualSession.countTime} мин, {data[currentPeople].individualSession.price} ₽</h4>
                                {data[currentPeople]?.freeTime.length !== 0 && <h4>Запись <span>с {formatDate(data[currentPeople]?.freeTime[0])}</span></h4>}
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
                                <p className={fullText ? styles.FullText : ""}>{data[currentPeople].description}</p>
                                {data[currentPeople].description.length > 322 && <h5 onClick={() => setFullText(!fullText)}>{fullText ? "Свернуть" : "Читать полностью"}</h5>}
                            </div>
                        </div>

                        <ButtonRound big={true} disabled={data.length > 0} onClick={() => setCurrentPeople(currentPeople + 1)}><ArrowRightIcon /></ButtonRound>
                    </div>

                    <div className={`${styles.TextBox} ${education ? styles.ActiveTextBox : ""}`} onClick={() => setEducation(!education)}>
                        <div className={styles.TextBoxTop}>
                            <div>
                                <h2>Образование</h2>
                                <p>4 подтвержденные записи</p>
                            </div>

                            <ArrowDownIcon />
                        </div>

                        <div className={styles.TextBoxBottom}>
                            {data[currentPeople].education.map((item, index) => (
                                <div key={index}>
                                    <h5>{item.year}</h5>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.TextBox} ${methods ? styles.ActiveTextBox : ""}`} onClick={() => setMethods(!methods)}>
                        <div className={styles.TextBoxTop}>
                            <div>
                                <h2>Методы терапии</h2>
                                <p>Гештальт-терапия</p>
                            </div>

                            <ArrowDownIcon />
                        </div>

                        <div className={styles.TextBoxBottom}>
                            {data[currentPeople].methods.map((item, index) => (
                                <div key={index}>
                                    <h5>{item.title}</h5>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.ButtonBox}>
                        <ButtonDefault disabled={false} onClick={() => navigate(`/specialist/${data[currentPeople].id}`)}>Выбрать время сессии</ButtonDefault>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Specialists