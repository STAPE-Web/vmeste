import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PsychSidebar from "@/components/PsyhSidebar";
import styles from "./style.module.css";
import { ArrowLeftIcon, ArrowRightIcon, BellIcon, Calendar2Icon } from "@/ui/Icons";
import { IPsychSession, IPsychSessions } from "@/types";
import { PshycologistsAPI } from "@/api";
import ScheduleItem from "@/ui/ScheduleItem";
import { parseDateString } from "@/utils";

const Schedule = () => {
    const navigate = useNavigate();
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const monthList = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
    const [data, setData] = useState<IPsychSession[]>([]);
    const [freeSessions, setFreeSessions] = useState<string[]>([]);
    const sid = JSON.parse(localStorage.getItem("sid") as string);
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const getSession = useCallback(async () => {
        const result: IPsychSessions = await PshycologistsAPI.getMy(sid);
        // @ts-ignore
        if (result.status === 402) {
            navigate("/psychologist/create")
        }
        setData(result.sessions);
        setFreeSessions(result.freeTimetables);
    }, [sid]);

    useEffect(() => {
        getSession();
        updateCurrentWeek(new Date());
    }, [getSession]);

    const updateCurrentWeek = (startDate: Date) => {
        const dayOfWeek = startDate.getDay();
        const firstDayOfWeek = new Date(startDate);
        firstDayOfWeek.setDate(startDate.getDate() - ((dayOfWeek + 6) % 7));
        const week = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(firstDayOfWeek);
            date.setDate(firstDayOfWeek.getDate() + i);
            return date;
        });
        setCurrentWeek(week);
    };

    const handlePrevWeek = () => {
        const newStartDate = new Date(currentWeek[0]);
        newStartDate.setDate(newStartDate.getDate() - 7);
        updateCurrentWeek(newStartDate);
    };

    const handleNextWeek = () => {
        const newStartDate = new Date(currentWeek[0]);
        newStartDate.setDate(newStartDate.getDate() + 7);
        updateCurrentWeek(newStartDate);
    };

    const selectDay = (date: Date) => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
    };

    const checkSelectedDay = (date: Date) => {
        return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
    };

    const filteredSessions = data.filter(i => i.status === "pending").filter(i => {
        const time = parseDateString(i.dateSession);
        return checkSelectedDay(time);
    });

    const filteredFreeSessions = freeSessions.map(timeString => parseDateString(timeString)).filter(date => {
        return checkSelectedDay(date);
    });

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.MobileHeader}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h3>Расписание</h3>
                    <BellIcon />
                </div>

                <div className={styles.Top}>
                    <h2>Расписание</h2>
                    <BellIcon />
                </div>

                <div className={styles.Calendar}>
                    <div className={styles.Info}>
                        <p>{new Date().getDate()} {monthList[new Date().getMonth()]} {new Date().getFullYear()}</p>

                        <div>
                            <h2>Сегодня</h2>
                            <Calendar2Icon onClick={() => navigate("/schedule/new")} />
                        </div>
                    </div>

                    <div className={styles.Dates}>
                        <ArrowLeftIcon onClick={handlePrevWeek} />
                        {currentWeek.map((date, index) => (
                            <div key={index} className={checkSelectedDay(date) ? styles.Highlight : ''} onClick={() => selectDay(date)}>
                                <span>{weekDays[date.getDay() === 0 ? 6 : date.getDay() - 1]}</span>
                                <p>{date.getDate()}</p>
                            </div>
                        ))}
                        <ArrowRightIcon onClick={handleNextWeek} />
                    </div>
                </div>

                {filteredSessions.length === 0 && filteredFreeSessions.length === 0
                    ? <div className={styles.Memo}>
                        <Calendar2Icon />
                        <p>На этот день вами не указано свободное время для сессий. Нажмите на значок календаря, чтобы настроить своё расписание.</p>
                    </div>
                    : <div>
                        {filteredSessions.map((item, index) => (
                            <ScheduleItem item={item} key={index} />
                        ))}
                        {filteredFreeSessions.map((timeString, index) => (
                            <ScheduleItem item={{ sesId: "", dateSession: timeString.toISOString(), sessionNumber: 0, userId: "", userName: "", status: "", isFree: true }} key={index} />
                        ))}
                    </div>
                }
            </section>
        </main>
    );
};

export default Schedule;
