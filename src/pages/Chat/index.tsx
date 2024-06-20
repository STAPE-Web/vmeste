import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, AttachIcon, CloseIcon, FileIcon, PhoneIcon, SearchIcon } from "@/ui/Icons";
import Sidebar from "@/components/Sidebar";
import PsychSidebar from "@/components/PsyhSidebar";
import useGlobalStore from "@/store";
import { generateToken, zim } from "@/utils";
import { ZIMMediaMessageBase, ZIMUserFullInfo } from "zego-zim-web";
import styles from "./style.module.css";

const Chat = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState("");
    const [search, setSearch] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [image, setImage] = useState<any>(null);
    const [user, setUser] = useState<ZIMUserFullInfo | null>(null);

    const userData = JSON.parse(localStorage.getItem("userData") as string);
    const userType = localStorage.getItem("userType");

    const callJoined = useGlobalStore(state => state.callJoined);
    const callId = useGlobalStore(state => state.callId);

    const toConversationID = id ? id.substring(0, 30) : "";
    const conversationType = 0;
    const config = { priority: 1 };
    const userInfo = { userID: userData.id.substring(0, 30), userName: userData.username || userData.name };

    useEffect(() => {
        const token = generateToken(userInfo.userID, 0);
        zim.login(userInfo.userID, { userName: userInfo.userName, token, isOfflineLogin: false }).then(() => {
            zim.queryHistoryMessage(toConversationID, 0, { count: 30, reverse: true }).then(res => setMessages(res.messageList));
            zim.clearConversationUnreadMessageCount(toConversationID, conversationType);
        });

        zim.on('tokenWillExpire', () => {
            const newToken = generateToken(userInfo.userID, 0);
            zim.renewToken(newToken);
        });

        if (id !== undefined) {
            setTimeout(() => {
                zim.queryUsersInfo([id.substring(0, 30)], { isQueryFromServer: false }).then(res => setUser(res.userList[0]));
            }, 1000)
        }

        setTimeout(() => scrollDown(), 1300);
    }, [id, toConversationID, userInfo.userID, userInfo.userName]);

    useEffect(() => {
        if (image) {
            sendMediaMessage();
        }
    }, [image]);

    const scrollDown = () => {
        if (ref.current) {
            const { scrollHeight, clientHeight } = ref.current;
            ref.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    const sendMessage = () => {
        const messageTextObj = { type: 1, message: value, extendedData: 'Extension info of the message (optional)' };
        zim.sendMessage(messageTextObj, toConversationID, conversationType, config).then(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    ...messageTextObj,
                    senderUserID: userInfo.userID,
                    timestamp: Date.now(),
                }
            ]);
            setValue("");
            scrollDown();
        }).catch(console.log);
    };

    const sendMediaMessage = useCallback(() => {
        if (image !== null) {
            const mes: ZIMMediaMessageBase = { fileLocalPath: image, type: image.type === "image/png" || image.type === "image/jpeg" ? 11 : 12 };
            zim.sendMediaMessage(mes, toConversationID, conversationType, config).then(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        ...mes,
                        senderUserID: userInfo.userID,
                        timestamp: Date.now(),
                        fileDownloadUrl: URL.createObjectURL(image),
                    }
                ]);
                setImage(null);
                scrollDown();
            }).catch(console.log);
        }
    }, [image, toConversationID, conversationType, config, userInfo.userID]);


    const formatDate = (date: number) => new Date(date).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

    const formatDateList = (date: number) => {
        const newDate = new Date(date);
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return `${newDate.getDate()} ${months[newDate.getMonth()]}, ${newDate.getFullYear()}`;
    };

    let prevDate: string | null = null;

    useEffect(() => {
        const handleIncomingMessage = () => {
            zim.queryHistoryMessage(toConversationID, 0, { count: 30, reverse: true }).then(res => setMessages(res.messageList));
            scrollDown();
        };

        zim.on('receivePeerMessage', handleIncomingMessage);

        return () => {
            zim.off('receivePeerMessage');
        };
    }, []);

    console.log(user)

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {userType ? <PsychSidebar /> : <Sidebar />}
                <div className={styles.Content}>
                    <div className={styles.Top}>
                        {search ? (
                            <div className={styles.Search}>
                                <SearchIcon />
                                <input type="text" placeholder="Поиск" />
                                <CloseIcon style={{ width: 15 }} onClick={() => setSearch(false)} />
                            </div>
                        ) : (
                            <>
                                <ArrowLeftIcon onClick={() => navigate(-1)} />
                                <h3>{user?.baseInfo.userName}</h3>
                                <SearchIcon onClick={() => setSearch(true)} />
                            </>
                        )}
                    </div>
                    {callJoined && (
                        <div className={styles.CallInfo} onClick={() => navigate(`/session/${callId}`)}>
                            <div>
                                <div className={styles.Dot}></div>
                                <p>Иван Иванов</p>
                            </div>
                            <button><PhoneIcon /></button>
                        </div>
                    )}
                    <div className={styles.MessageBox} ref={ref}>
                        {messages.map((msg, index) => {
                            const currentDate = formatDateList(msg.timestamp);
                            const displayDate = prevDate !== currentDate;
                            if (displayDate) prevDate = currentDate;
                            return (
                                <React.Fragment key={index}>
                                    {displayDate && <h6>{currentDate}</h6>}
                                    <div className={`${styles.Message} ${msg.senderUserID === userInfo.userID ? styles.MyMessage : ""}`}>
                                        <div>
                                            {msg.message}
                                            {msg.type === 11 && <img src={msg.fileDownloadUrl} alt="" />}
                                            {msg.type === 12 && <a href={msg.fileDownloadUrl}><FileIcon />{msg.fileName}</a>}
                                            <p>{formatDate(msg.timestamp)}</p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div className={styles.Input}>
                        <input type="file" id="upload" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} />
                        <label htmlFor="upload"><AttachIcon /></label>
                        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Сообщение..." />
                        <button onClick={sendMessage}><ArrowRightIcon /></button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Chat;
