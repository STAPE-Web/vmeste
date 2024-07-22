import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { PshycologistsAPI, SessionAPI } from "@/api"
import { IPsychSession, IPsychSessions, ISession } from "@/types"
import useGlobalStore from "@/store"
import PsychSidebar from "@/components/PsyhSidebar"

const Session = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [data, setData] = useState<ISession | null>(null)
    const [psychData, setPsychData] = useState<IPsychSession | null>(null)
    const { id } = useParams()
    const changeCallID = useGlobalStore(state => state.changeCallId)
    const changePsychId = useGlobalStore(state => state.changePsychId)
    const changeOpponentName = useGlobalStore(state => state.changeOpponentName)
    const changeSessionJoined = useGlobalStore(state => state.changeSessionJoined)
    const userType = localStorage.getItem("userType" as string)
    const callJoined = useGlobalStore(state => state.callJoined)
    const [isAvalible, setIsAvalible] = useState(false)

    const getSession = useCallback(async () => {
        if (userType === "psych") {
            const result: IPsychSessions = await PshycologistsAPI.getMy(sid)
            const avalible = result.sessions.some(i => i.sesId === id)
            setPsychData(avalible ? result.sessions.filter(i => i.sesId === id)[0] : null)
            setIsAvalible(avalible)
        } else {
            const result = await SessionAPI.get(sid)
            const allSessions: ISession[] = result.sessions.future
            const avalible = allSessions.some(i => i.id === id)
            setData(avalible ? allSessions.filter(i => i.id === id)[0] : null)
            setIsAvalible(avalible)
        }
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    useEffect(() => {
        if (data) {
            changePsychId(data?.psychId)
            changeOpponentName(data?.psychName)
        }

        if (psychData) {
            changePsychId(psychData?.userId)
            changeOpponentName(psychData?.userName)
        }
    }, [data, psychData])

    useEffect(() => {
        if (id) {
            changeCallID(id)
        }
    }, [id])

    function formatDate(value: string) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const weeks = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        const dateParts = value.split(" ")[0].split("-");
        const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        const day = date.getDate();
        const month = date.getMonth();
        const weekDay = date.getDay() - 1;

        return `${weeks[weekDay]}, ${day} ${months[month]}`;
    }

    function formatTime(value: string) {
        const timeParts = value.split(" ")[1].split(":");
        const hour = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    async function cancelSession() {
        const result = await SessionAPI.cancel({ sid, sesId: id })
        console.log(result)
        if (result.status === 200) {
            navigate("/sessions")
        } else {
            alert(result.msg)
        }
    }

    const endDate: any = userType === "psych"
        ? new Date(psychData !== null ? psychData?.dateSession : "2024-04-23 01:10:0.00")
        : new Date(data !== null ? data?.dateSession : "2024-04-23 01:10:0.00")
    const difference = endDate - Date.now();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const leftTime = useGlobalStore(state => state.leftTime)
    const changeLeftTime = useGlobalStore(state => state.changeLeftTime)
    const calculateTime = useCallback(() => {
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        if (days === 0) {
            if (difference < 0) {
                changeLeftTime("00:00:00")
            } else {
                changeLeftTime(time)
                changeSessionJoined(true)
            }
        } else {
            if (difference < 0) {
                changeLeftTime("00:00:00")
            } else {
                changeLeftTime("")
            }
        }
    }, [days, hours, minutes, seconds, difference])

    useEffect(() => {
        const intervalId = setInterval(() => {
            calculateTime();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [calculateTime]);

    useEffect(() => {
        if (leftTime === "00:00:00") {
            changeSessionJoined(isAvalible)
        }
    }, [leftTime])

    useEffect(() => {
        if (window.innerWidth <= 1160 && callJoined) {
            const elem: HTMLDivElement | null = document.querySelector(".kdokPV9jgsyFtd2e8Ek2")
            elem?.click()
        }
    }, [callJoined])

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {!(window.innerWidth <= 1160 && callJoined) && (userType === "psych" ? <PsychSidebar /> : <Sidebar />)}

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate(-1)} />
                        {isAvalible && <h2>{data?.psychName || psychData?.userName} <span>{data?.sessionNumber || psychData?.sessionNumber} сессия</span></h2>}
                        <h6>Мои сессии</h6>
                        <span></span>
                    </div>

                    {isAvalible
                        ? <>{leftTime === ""
                            ? <div className={styles.Box}>
                                <p>Ближайшая сессия</p>

                                <div className={styles.Column}>
                                    {userType !== "psych"
                                        ? data !== null && <h4>{formatDate(data?.dateSession)}</h4>
                                        : psychData !== null && <h4>{formatDate(psychData?.dateSession)}</h4>}
                                    {userType !== "psych"
                                        ? data !== null && <h3>{formatTime(data?.dateSession)}</h3>
                                        : psychData !== null && <h3>{formatTime(psychData?.dateSession)}</h3>}
                                </div>

                                <div className={styles.Row}>
                                    <button onClick={() => cancelSession()}>Отменить</button>
                                    <button onClick={() => navigate(`/calendar?id=${id}&pid=${data?.psychId}`)}>Перенести</button>
                                </div>
                            </div>
                            : <div className={styles.Box}>
                                {leftTime !== "00:00:00" && <p>Дождитесь начала сессии и подключайтесь</p>}
                                {leftTime === "00:00:00" && <h4>Сессия началась</h4>}

                                {leftTime !== "00:00:00" && <div className={styles.Column}>
                                    <h3>{leftTime}</h3>
                                </div>}
                            </div>
                        }</>
                        : <div className={styles.Box}>
                            <h4>Сессия не доступна</h4>
                        </div>
                    }

                    <div className={styles.Empty}></div>
                </div>
            </section>
        </main>
    )
}

export default Session