import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, Like2Icon, LikeIcon, ThemesIcon, VerifedIcon, WarningRoundIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PshycologistsAPI, SessionAPI } from "@/api"
import { ISpecialist } from "@/types"
import Calendar from "@/components/Calendar"
import Input from "@/ui/Input"
import SelectPayment from "@/components/SelectPayment"
import CardModal from "@/components/CardModal"

const Specialist = () => {
    const { id } = useParams()
    const [data, setData] = useState<ISpecialist | null>(null)
    const navigate = useNavigate()

    const [fullText, setFullText] = useState(false)
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [selectedDate, setSelectedDate] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth()).length !== 1 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`}-${String(new Date().getDate()).length !== 1 ? new Date().getDate() : `0${new Date().getDate()}`}`)
    const [promo, setPromo] = useState("")
    const [time, setTime] = useState("")
    const [sale, setSale] = useState(0)
    const [error, setError] = useState("")
    const [modal, setModal] = useState(false)

    const getSpecialist = useCallback(async () => {
        const result = await PshycologistsAPI.get(sid, { familyTherapy: true, gender: "M", prices: [2500], themes: ["Стресс"] })
        const userData = result.psychologists.find((i: ISpecialist) => i.id === id)
        setData(userData)
    }, [sid, id])

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

    if (data === null) return

    const achive = [
        { title: "Опыт", value: `${data?.exp} лет`, icon: VerifedIcon },
        { title: "Темы", value: `${data?.sameThemesCount}/4`, icon: ThemesIcon },
    ]

    async function bookSession() {
        if (data === null) return;
        const sessionData = {
            sid: sid,
            psychId: data?.id,
            time: time,
            price: data?.individualSession.price - (data?.individualSession.price * (sale / 100))
        }

        const result = await SessionAPI.book(sessionData)
        alert(result.status === 200 ? "Сессия создана" : result.msg)
        setTime("")
        getSpecialist()
        console.log(result)
    }

    async function setPromocode() {
        const result = await SessionAPI.promo({ sid, promo })
        if (result.status === 200) {
            setSale(result.sale)
            setError("")
        } else {
            setError(result.msg)
        }
    }

    async function toggleLike(id: string, action: "add" | "delete", type: "psychologists") {
        await PshycologistsAPI.like(sid, action, type, id)
        await getSpecialist()
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <ArrowLeftIcon className={styles.Back} onClick={() => navigate(-1)} width={30} height={30} style={{ color: "#D9D9D9", cursor: "pointer" }} />

                    <div className={styles.InfoBox}>
                        <div className={styles.ImageBox}>
                            <img src={data?.urlAvatar} alt="" />
                            {data.isFavourite
                                ? <Like2Icon onClick={() => toggleLike(data.id, "delete", "psychologists")} />
                                : <LikeIcon onClick={() => toggleLike(data.id, "add", "psychologists")} />
                            }
                        </div>

                        <div className={styles.Info}>
                            <h3>{data?.name}</h3>
                            <div>
                                <h4>Индивидуальная сессия {data?.individualSession.countTime} мин, {data?.individualSession.price} ₽</h4>
                                {data?.freeTime.length !== 0 && <h4>Запись <span>с {formatDate(data?.freeTime[0])}</span></h4>}
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
                        <Calendar setSelectedDate={setSelectedDate} />
                    </div>

                    <div className={styles.Time}>
                        <h2>Свободное время</h2>
                        <div className={styles.TimeList}>
                            {data.freeTime.length === 0
                                ? <p>На данный момент у специалиста нет свободного времени</p>
                                : <> {data.freeTime.filter(i => i.includes(selectedDate)).map((item, index) => (
                                    <div className={time === item ? styles.ActiveTime : ""} key={index} onClick={() => setTime(item)}>
                                        {formatDate(item).split(" ").at(-1)}
                                    </div>
                                ))}</>
                            }
                        </div>

                        <div className={styles.Message}>
                            <WarningRoundIcon />
                            <p>Сессии можно перенести не позднее, чем за 12 часов до начала</p>
                        </div>
                    </div>

                    <div className={styles.Promo}>
                        <SelectPayment setModal={setModal} />
                        <div className={styles.PromoRow}>
                            <Input onChange={e => setPromo(e.target.value)} placeholder="Введите промокод" type="text" value={promo} />
                            <ButtonDefault disabled={promo === ""} onClick={() => setPromocode()}>Применить</ButtonDefault>
                        </div>
                        <div className={`${styles.Message} ${error !== "" ? styles.Error : ""}`}>
                            <WarningRoundIcon />
                            <p>{error !== "" ? error : "Одновременно можно использовать только один промокод"}</p>
                        </div>
                    </div>

                    <div className={styles.TotalBox}>
                        <p>Индивидуальная сессия {data?.individualSession.countTime} мин</p>
                        <h4>{data?.individualSession.price - (data?.individualSession.price * (sale / 100))} ₽</h4>
                        <ButtonDefault disabled={time === "" || selectedDate === ""} onClick={() => bookSession()}>Записаться и оплатить</ButtonDefault>
                        <h6>Записываясь, вы подтверждаете свое согласие с <span>договором оказания услуг</span> психолога</h6>
                    </div>
                </div>
            </section>

            {modal && <CardModal setActive={setModal} />}
        </main>
    )
}

export default Specialist