import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon, ArrowRightIcon, AttachIcon, CloseIcon, SearchIcon } from "@/ui/Icons"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { generateToken, zim } from "@/utils"
import { ZIMMessage } from "zego-zim-web"

const Chat = () => {
    const navigate = useNavigate()
    const ref = useRef<HTMLDivElement | null>(null)
    const [value, setValue] = useState("")
    const [search, setSearch] = useState(false)
    const [messages, setMessages] = useState<ZIMMessage[]>([])
    const userData = JSON.parse(localStorage.getItem("userData") as string)
    const { id } = useParams()

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

    const userInfo = { userID: userData.email, userName: userData.name };
    const token = generateToken(userInfo.userID, 0)
    zim.login(userInfo.userID, { userName: userInfo.userName, token: token, isOfflineLogin: false }).then(() => {
        zim.queryHistoryMessage(toConversationID, 0, { count: 30, reverse: true })
            .then((res) => {
                setMessages(res.messageList)
            })
            .catch((err) => console.error(err));
    })

    zim.on('tokenWillExpire', function () {
        const token = generateToken(userInfo.userID, 0)
        zim.renewToken(token)
            .then(function ({ token }) {
                console.log(token)
            })
            .catch(function (err) {
                console.log(err)
            });
    })

    var userIDs = [userData.email, "0"];

    zim.queryUsersInfo(userIDs, { isQueryFromServer: false })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (err) {
            console.log(err)
        });

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

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        {search
                            ? <>
                                <div className={styles.Search}>
                                    <SearchIcon />
                                    <input type="text" placeholder="Поиск" />
                                </div>
                                {/* <Calendar2Icon onClick={() => navigate("/calendar")} /> */}
                                <CloseIcon style={{ width: 15 }} onClick={() => setSearch(false)} />
                            </>
                            : <>
                                <ArrowLeftIcon onClick={() => navigate(-1)} />
                                <h3>Отправить сообщение</h3>
                                <SearchIcon onClick={() => setSearch(true)} />
                            </>
                        }
                    </div>

                    <div className={styles.MessageBox} ref={ref}>
                        <h6>1 янв. 2024</h6>
                        {messages.map((msg, index) => (
                            <div key={index} className={`${styles.Message} ${msg.senderUserID === userData.email ? styles.MyMessage : ""}`}>
                                <div>
                                    {msg.message}
                                    <p>{formatDate(msg.timestamp)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.Input}>
                        <input type="file" id="upload" />
                        <label htmlFor="upload"><AttachIcon /></label>
                        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Сообщение..." />
                        <button onClick={() => sendMessage()}>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chat