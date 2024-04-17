import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import { SearchIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { generateToken, zim } from "@/utils"
import { ZIMConversation } from "zego-zim-web"

const Chats = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [items, setItems] = useState<ZIMConversation[]>([])
    const [isLogged, setIsLogged] = useState(false)
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';

        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []);

    const userInfo = { userID: userData.type === "email" ? userData.email : userData.phone, userName: userData.name };
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
            return `${newDate.getHours()}:${newDate.getMinutes()}`
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

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Search}>
                        <SearchIcon />
                        <input type="text" value={search} onKeyDown={handleKeyPress} onChange={e => setSearch(e.target.value)} placeholder="Поиск" />
                    </div>

                    <div className={styles.List}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.Item} onClick={() => navigate(`/chat/${item.conversationID}`)}>
                                <div className={styles.ItemBox}>
                                    <img src={item.conversationAvatarUrl} alt="" />
                                    <div>
                                        <h3>{item.conversationName}</h3>
                                        <p>{item.lastMessage?.message}</p>
                                    </div>
                                </div>

                                <div className={styles.TimeBox}>
                                    <h6>{formatDate(item.lastMessage?.timestamp)}</h6>
                                    {/* {item.count !== 0 && <div>{item.count}</div>} */}
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