import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, AttachIcon, CloseIcon, FileIcon, PhoneIcon, SearchIcon } from "@/ui/Icons"
import { useNavigate, useParams } from "react-router-dom"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { generateToken, zim } from "@/utils"
import { ZIMMediaMessageBase, ZIMUserFullInfo } from "zego-zim-web"
import useGlobalStore from "@/store"

const Chat = () => {
    const navigate = useNavigate()
    const ref = useRef<HTMLDivElement | null>(null)
    const [value, setValue] = useState("")
    const [search, setSearch] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const userData = JSON.parse(localStorage.getItem("userData") as string)
    const { id } = useParams()
    const [image, setImage] = useState<any>(null)
    const [user, setUser] = useState<ZIMUserFullInfo | null>(null)
    const callJoined = useGlobalStore(state => state.callJoined)
    const callId = useGlobalStore(state => state.callId)

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';

        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []);

    function scrollDown() {
        if (ref.current) {
            const { scrollHeight, clientHeight } = ref.current;
            ref.current.scrollTop = scrollHeight - clientHeight;
        }
    }

    const userInfo = { userID: userData.type === "email" ? userData.email : userData.phone, userName: userData.name };
    const token = generateToken(userInfo.userID, 0)
    zim.login(userInfo.userID, { userName: userInfo.userName, token: token, isOfflineLogin: false }).then(() => {
        zim.queryHistoryMessage(toConversationID, 0, { count: 30, reverse: true })
            .then((res) => {
                setMessages(res.messageList)
            })

        zim.clearConversationUnreadMessageCount(toConversationID, conversationType)
    })

    zim.on('tokenWillExpire', function () {
        const token = generateToken(userInfo.userID, 0)
        zim.renewToken(token)
    })

    const getUserInfo = useCallback(() => {
        zim.queryUsersInfo([id || ""], { isQueryFromServer: false })
            .then(function (res) {
                setUser(res.userList[0])
            })
    }, [id])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    const toConversationID = id || "";
    const conversationType = 0;
    const config = {
        priority: 1,
    };

    const messageTextObj = { type: 1, message: value, extendedData: 'Extension info of the message (optional)' };

    function sendMessage() {
        zim.sendMessage(messageTextObj, toConversationID, conversationType, config)
            .then(function () {
                setValue("")
                scrollDown()
            })
            .catch(function (err) {
                console.log(err)
            });

        scrollDown()
    }

    function formatDate(date: number) {
        const newDate = new Date(date);
        return `${newDate.getHours()}:${newDate.getMinutes()}`
    }

    useEffect(() => {
        setTimeout(() => scrollDown(), 1300)
    }, [])

    const sendMediaMessage = useCallback(() => {
        if (image !== null) {
            const mes: ZIMMediaMessageBase = { fileLocalPath: image, type: image.type === "image/png" || image.type === "image/jpeg" ? 11 : 12 }
            zim.sendMediaMessage(mes, toConversationID, conversationType, config).then(function () {
                setValue("")
                scrollDown()
            }).catch(function (err) {
                console.log(err)
            });
        }

        scrollDown()
    }, [image])

    useEffect(() => {
        sendMediaMessage()
    }, [sendMediaMessage])

    function formatDateList(date: number) {
        const newDate = new Date(date);
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        const formattedDate = `${newDate.getDate()} ${months[newDate.getMonth()]}, ${newDate.getFullYear()}`
        return formattedDate
    }

    let prevDate: string | null = null;

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        {search ? (
                            <>
                                <div className={styles.Search}>
                                    <SearchIcon />
                                    <input type="text" placeholder="Поиск" />
                                </div>
                                <CloseIcon style={{ width: 15 }} onClick={() => setSearch(false)} />
                            </>
                        ) : (
                            <>
                                <ArrowLeftIcon onClick={() => navigate(-1)} />
                                <h3>{user?.baseInfo.userName}</h3>
                                <SearchIcon onClick={() => setSearch(true)} />
                            </>
                        )}
                    </div>

                    {callJoined && <div className={styles.CallInfo} onClick={() => navigate(`/session/${callId}`)}>
                        <div>
                            <div className={styles.Dot}></div>
                            <p>Иван Иванов</p>
                        </div>

                        <button><PhoneIcon /></button>
                    </div>}

                    <div className={styles.MessageBox} ref={ref}>
                        {messages.map((msg, index) => {
                            const currentDate = formatDateList(msg.timestamp);
                            let displayDate = false;

                            if (prevDate !== currentDate) {
                                displayDate = true;
                                prevDate = currentDate;
                            }

                            return (
                                <React.Fragment key={index}>
                                    {displayDate && <h6>{currentDate}</h6>}
                                    <div className={`${styles.Message} ${msg.senderUserID === userData.email ? styles.MyMessage : ""}`}>
                                        <div>
                                            {msg.message}
                                            {msg.type === 11 && <img src={msg.fileDownloadUrl} alt="" />}
                                            {msg.type === 12 && <a href={msg.fileDownloadUrl}>
                                                <FileIcon />
                                                {msg.fileName}
                                            </a>}
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
                        <button onClick={() => sendMessage()}>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Chat