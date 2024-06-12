import { TelegramShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import { ArrowLeftIcon, Like2Icon, LikeIcon } from '@/ui/Icons';
import styles from './style.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { IArticle } from '@/types';
import { MaterialsAPI } from '@/api';
import Telegram from '@/assets/Share/Telegram';
import CopyLink from '@/assets/Share/CopyLink';
import WhatsApp from '@/assets/Share/WhatsApp';
import Mail from '@/assets/Share/Mail';
import Message from '@/assets/Share/Message';
import More from '@/assets/Share/More';

const Article = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<IArticle | null>(null);
    const { id } = useParams();
    const sid = JSON.parse(localStorage.getItem("sid") as string);

    const getArticle = useCallback(async () => {
        const result = await MaterialsAPI.getAll(sid);
        const blogData = result.result.articles;
        const article: any = Object.values(blogData).find(array => Array.isArray(array) && array.some(obj => obj.id === id));
        setData(article[0]);
    }, [sid, id]);

    useEffect(() => {
        getArticle();
    }, [getArticle]);

    const renderTextWithBoldWords = (text: string) => {
        const regex = /'([^']+)'/g;

        const parts: JSX.Element[] = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            parts.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
            parts.push(<strong key={match.index}>{match[1]}</strong>);
            lastIndex = regex.lastIndex;
        }

        parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);

        return parts;
    };

    function convertDate(value: number) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",];
        const date = new Date(value);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day} ${months[month]} ${year}`;
    }

    const url = window.location.href;

    const shareList = [
        { icon: Telegram, name: "Telegram" },
        { icon: CopyLink, name: "Коп. ссылку" },
        { icon: WhatsApp, name: "WhatsApp" },
        { icon: Mail, name: "Почта" },
        { icon: Message, name: "Сообщения" },
        { icon: More, name: "Ещё" },
    ]

    function copyLink() {
        const textArea = document.createElement("textarea");

        textArea.value = url;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? alert('Успешно скопировано!') : alert('Не удалось скопировать!');
            console.log(msg);
        } catch (err) {
            console.error('Ошибка копирования: ', err);
        }

        document.body.removeChild(textArea);
    }

    async function toggleLike(action: "add" | "delete", type: "tests" | "articles" | "videos") {
        if (id) {
            await MaterialsAPI.like(sid, action, type, id)
            await getArticle()
        }
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <div className={styles.Controlls}>
                    <div onClick={() => navigate(-1)} className={styles.Back}><ArrowLeftIcon /> Назад</div>
                </div>

                <div className={styles.Box}>
                    <div className={styles.Row}>
                        <div className={styles.Category}>Стресс</div>
                        {data?.isFavorite
                            ? <Like2Icon onClick={() => toggleLike("delete", "articles")} className={styles.Like} />
                            : <LikeIcon onClick={() => toggleLike("add", "articles")} className={styles.Like} />
                        }
                    </div>

                    <h2>{data?.title}</h2>

                    <div className={styles.Autor}>
                        <img src="" alt="" />
                        <p>Анна Дегтярёва · {convertDate(data ? data?.createdAt : 0)}</p>
                    </div>

                    <p>{renderTextWithBoldWords(data ? data?.text : "")}</p>

                    <div className={styles.Share}>
                        <h3>Поделиться</h3>
                        <div className={styles.ShareList}>
                            {shareList.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.name === "Telegram" && <TelegramShareButton url={url}><item.icon />{item.name}</TelegramShareButton>}
                                    {item.name === "WhatsApp" && <WhatsappShareButton url={url}><item.icon />{item.name}</WhatsappShareButton>}
                                    {item.name === "Почта" && <EmailShareButton url={url}><item.icon />{item.name}</EmailShareButton>}
                                    {item.name !== "Telegram" && item.name !== "WhatsApp" && item.name !== "Почта" && <button key={index} onClick={() => copyLink()}>
                                        <item.icon />
                                        {item.name}
                                    </button>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Article;
