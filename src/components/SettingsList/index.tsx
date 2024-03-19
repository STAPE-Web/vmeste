import Toggle from "@/ui/Toggle"
import styles from "./style.module.css"
import { useState } from "react"

const SettingsList = () => {
    const [state, setState] = useState(false)

    function signOut() {
        localStorage.removeItem("sid")
        window.location.replace("/")
    }

    return (
        <div className={styles.Settings}>
            <div className={styles.Box}>
                <div >
                    <label>Телефон</label>
                    <h4>+7 999 999-99-99</h4>
                </div>

                <button>Изменить</button>
            </div>

            <div >
                <label>Имя или псевдониим</label>
                <h4>Иван</h4>
            </div>

            <div >
                <label>Возраст</label>
                <h4>39 лет</h4>
            </div>

            <div >
                <label>Электронная почта</label>
                <h4>ivan.ivanov@mail.ru</h4>
            </div>

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