import Toggle from "@/ui/Toggle"
import styles from "./style.module.css"
import { FC, useState } from "react"
import { IProfile } from "@/types"

interface Props {
    data: IProfile
}

const SettingsList: FC<Props> = ({ data }) => {
    const [state, setState] = useState(false)

    function signOut() {
        localStorage.removeItem("sid")
        window.location.replace("/")
    }

    return (
        <div className={styles.Settings}>
            {data.userInfo.type === "phone" && <div className={styles.Box}>
                <div>
                    <label>Телефон</label>
                    <h4>{data.userInfo.phone}</h4>
                </div>
            </div>}

            <div >
                <label>Имя или псевдониим</label>
                <h4>{data.userInfo.name}</h4>
            </div>

            <div >
                <label>Возраст</label>
                <h4>{data.userInfo.age} лет</h4>
            </div>

            {data.userInfo.type === "email" && <div>
                <label>Электронная почта</label>
                <h4>{data.userInfo.email}</h4>
            </div>
            }

            <h2>Настройки</h2>

            <div className={styles.ToggleBox}>
                <div>
                    <h4>Уведомление от сервиса</h4>
                    <p>Напоминание о сессии, новые сообщения от психолога или службы поддержки</p>
                </div>

                <Toggle state={state} setState={setState} />
            </div>

            <div className={styles.Row}>
                <p onClick={() => signOut()}>Выйти</p>
                <p>Удалить аккаунт</p>
            </div>
        </div>
    )
}

export default SettingsList