import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { SearchIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { generateToken, zim } from "@/utils"
import { ZIMConversation } from "zego-zim-web"
import Avatar from "@/assets/Avatar.svg"
import PsychSidebar from "@/components/PsyhSidebar"

const Chats = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [items, setItems] = useState<ZIMConversation[]>([])
    const [isLogged, setIsLogged] = useState(false)
    const userData = JSON.parse(localStorage.getItem("userData") as string)
    const userType = localStorage.getItem("userType")

    const userInfo = { userID: userData.id.substring(0, 30), userName: userData.username || userData.name };
    const token = generateToken(userInfo.userID, 0)

    const loginUser = useCallback(() => {
        zim.login(userInfo.userID, { userName: userInfo.userName, token: token, isOfflineLogin: false }).then(() => {
            setIsLogged(true)
        })
    }, [userInfo, token])

    useEffect(() => {
        loginUser()
    }, [loginUser])

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

    function formatDate(date: number | undefined) {
        if (date !== undefined) {
            const newDate = new Date(date);
            const hours = String(newDate.getHours()).length !== 1 ? newDate.getHours() : `0${newDate.getHours()}`
            const minutes = String(newDate.getMinutes()).length !== 1 ? newDate.getMinutes() : `0${newDate.getMinutes()}`
            return `${hours}:${minutes}`
        }
    }

    const getChats = useCallback(() => {
        if (isLogged) {
            zim.queryConversationList({ count: 10 }).then((res) => {
                setItems(res.conversationList)
            }).catch(err => console.log(err))
        }
    }, [isLogged])

    useEffect(() => getChats(), [getChats])

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate(`/chat/${search}`)
        }
    };

    zim.on("receivePeerMessage", () => {
        getChats()
    })

    const filteredChats = items.filter(i => {
        const chatDate = new Date(i.orderKey);
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        return (now.getTime() - chatDate.getTime()) < oneDay;
    });

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {userType ? <PsychSidebar /> : <Sidebar />}

                <div className={styles.Content}>
                    <div className={styles.Search}>
                        <SearchIcon />
                        <input type="text" value={search} onKeyDown={handleKeyPress} onChange={e => setSearch(e.target.value)} placeholder="Поиск" />
                    </div>

                    <div className={styles.List}>
                        {filteredChats.filter(i => i.conversationName.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                            <div key={index} className={styles.Item} onClick={() => navigate(`/chat/${item.conversationID}`)}>
                                <div className={styles.ItemBox}>
                                    <img src={Avatar} alt="" />
                                    <div>
                                        <h3>{item.conversationName}</h3>
                                        {item.lastMessage?.type === 1 && <p>{item.lastMessage.message}</p>}
                                        {item.lastMessage?.type === 11 && <p>Фото</p>}
                                        {item.lastMessage?.type === 12 && <p>Файл</p>}
                                    </div>
                                </div>

                                <div className={styles.TimeBox}>
                                    <h6>{formatDate(item.lastMessage?.timestamp)}</h6>
                                    {item.unreadMessageCount !== 0 && <div>{item.unreadMessageCount}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chats