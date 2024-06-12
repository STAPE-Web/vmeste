import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, VideoIcon } from "@/ui/Icons"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { SessionAPI } from "@/api"
import { ISession } from "@/types"
import ButtonDefault from "@/ui/Buttons/Default"
import Avatar from "@/assets/Avatar.svg"
import useGlobalStore from "@/store"

const Session = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [data, setData] = useState<ISession | null>(null)
    const { id } = useParams()
    const [enterCall, setEnterCall] = useState(false)
    const changeCallID = useGlobalStore(state => state.changeCallId)
    const changePsychId = useGlobalStore(state => state.changePsychId)

    const getSession = useCallback(async () => {
        const result = await SessionAPI.get(sid)
        const allSessions: ISession[] = result.sessions.future
        setData(allSessions.filter(i => i.id === id)[0])
    }, [sid])

    useEffect(() => {
        getSession()
    }, [getSession])

    useEffect(() => {
        if (data) {
            changePsychId(data?.psychId)
        }
    }, [data])

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
        const weekDay = date.getDay();

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

    const endDate: any = data && new Date("2024-04-23 01:10:0.00");
    const difference = endDate - Date.now();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const [leftTime, setLeftTime] = useState("")
    const calculateTime = useCallback(() => {
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        if (days === 0) {
            if (difference < 0) {
                setLeftTime("00:00:00")
            } else {
                setLeftTime(time)
            }
        } else {
            if (difference < 0) {
                setLeftTime("00:00:00")
            } else {
                setLeftTime("")
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
            setEnterCall(true)
        }
    }, [leftTime])

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                {enterCall
                    ? <div id="call"></div>
                    : <div className={styles.Content}>
                        {data !== null && <>
                            <div className={styles.Top}>
                                <ArrowLeftIcon onClick={() => navigate(-1)} />
                                <h2>{data.psychName} <span>{data.sessionNumber} сессия</span></h2>
                                <h6>Мои сессии</h6>
                                <span></span>
                            </div>

                            {leftTime === ""
                                ? <div className={styles.Box}>
                                    <p>Ближайшая сессия</p>

                                    <div className={styles.Column}>
                                        <h4>{formatDate(data.dateSession)}</h4>
                                        <h3>{formatTime(data.dateSession)}</h3>
                                    </div>

                                    <div className={styles.Row}>
                                        <button onClick={() => cancelSession()}>Отменить</button>
                                        <button onClick={() => navigate(`/calendar?id=${id}&pid=${data.psychId}`)}>Перенести</button>
                                    </div>
                                </div>
                                : <div className={styles.Box}>
                                    {leftTime !== "00:00:00" && <p>Дождитесь начала сессии и подключайтесь</p>}
                                    {leftTime === "00:00:00" && <h4>Сессия началась</h4>}

                                    {leftTime !== "00:00:00" && <div className={styles.Column}>
                                        <h3>{leftTime}</h3>
                                    </div>}

                                    <div className={styles.VideoRound}>
                                        {leftTime !== "00:00:00" ? <VideoIcon /> : <img src={Avatar} alt="" />}
                                    </div>

                                    <div className={styles.RowActive}>
                                        <ButtonDefault disabled={false} onClick={() => setEnterCall(true)}>Войти</ButtonDefault>
                                    </div>
                                </div>
                            }

                            <div className={styles.Empty}></div>
                        </>}
                    </div>
                }
            </section>
        </main>
    )
}

export default Session