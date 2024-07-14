import PsychSidebar from "@/components/PsyhSidebar";
import styles from "./style.module.css";
import { ArrowLeftIcon, Time2Icon, UserIcon, VerifedIcon } from "@/ui/Icons";
import Favicon from "@/assets/Favicon";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ClientsAPI, PshycologistsAPI } from "@/api";
import { IClient, IPsychStats } from "@/types";

const getCorrectWordForm = (num: number, forms: [string, string, string]) => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
};

const Statistics = () => {
    const navigate = useNavigate();
    const sid = JSON.parse(localStorage.getItem("sid") as string);
    const [data, setData] = useState<IPsychStats | null>(null);
    const [clientData, setClientData] = useState<IClient[]>([]);
    const createdAt = data && new Date(data?.createdAt);

    let years = 0, months = 0, days = 0;

    if (createdAt) {
        const now = new Date();

        years = now.getFullYear() - createdAt.getFullYear();
        months = now.getMonth() - createdAt.getMonth();
        days = now.getDate() - createdAt.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }
    }

    const getData = useCallback(async () => {
        const result: IPsychStats = await PshycologistsAPI.getStatistics(sid);
        setData(result);
    }, [sid]);

    const getClients = useCallback(async () => {
        const result = await ClientsAPI.get(sid);
        setClientData(result.clients);
    }, [sid]);

    useEffect(() => {
        getData();
        getClients();
    }, [getData, getClients]);

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.MobileHeader}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h3>Статистика</h3>
                    <div />
                </div>
                <h2 className={styles.Title}>Статистика</h2>

                <div className={styles.List}>
                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <VerifedIcon />
                            <h4>Повторные сессии</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>{data?.repeatedSessions} из {data?.repeatedSessionsTarget}</h3>
                        </div>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <UserIcon />
                            <h4>Ваши клиенты</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>{clientData.length} всего</h3>
                        </div>
                    </div>

                    <div className={styles.Item}>
                        <div className={styles.Top}>
                            <Time2Icon />
                            <h4>Проведенные сессии</h4>
                        </div>

                        <div className={styles.Bottom}>
                            <h3>{data?.totalSessions} всего</h3>
                        </div>
                    </div>
                </div>

                <div className={styles.WithUs}>
                    <div className={styles.Row}>
                        <p>Вы с Вместе</p>
                        <Favicon />
                    </div>

                    <h3>
                        {years !== 0 && <>{years} {getCorrectWordForm(years, ["год", "года", "лет"])}{" "}</>}
                        {months !== 0 && <>{months} {getCorrectWordForm(months, ["месяц", "месяца", "месяцев"])}{" "}</>}
                        {days !== 0 ? <>{days} {getCorrectWordForm(days, ["день", "дня", "дней"])}{" "}</> : "1 день"}
                    </h3>
                </div>
            </section>
        </main>
    );
};

export default Statistics;
