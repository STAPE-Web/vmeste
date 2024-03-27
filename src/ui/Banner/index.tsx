import { useNavigate } from "react-router-dom"
import ButtonDefault from "../Buttons/Default"
import styles from "./style.module.css"
import { BellIcon, UserIcon } from "../Icons"
import { ISession } from "@/types"
import { FC } from "react"

interface Props {
    data: ISession[]
}

const Banner: FC<Props> = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.Banner}>
            <div className={styles.MobileHeader}>
                <div className={styles.User} onClick={() => navigate("/profile")}>
                    <UserIcon />
                </div>

                <div className={styles.Notifications}>
                    <BellIcon />
                </div>
            </div>

            {data.filter(i => i.status !== "canceled").length !== 0
                ? <div className={styles.Box}>
                    <h2>Запланированных сессий - {data.filter(i => i.status !== "canceled").length}</h2>
                    <ButtonDefault onClick={() => navigate("/sessions")} disabled={false}>Все сессии</ButtonDefault>
                </div>
                : <div className={styles.Box}>
                    <h2>У вас пока нет сессий</h2>
                    <ButtonDefault onClick={() => navigate("/specialists")} disabled={false}>Выбрать психолога</ButtonDefault>
                </div>
            }
        </div>
    )
}

export default Banner