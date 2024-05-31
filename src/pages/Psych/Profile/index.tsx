import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import Input from "@/ui/Input"
import InputItem from "@/ui/InputItem"
import Textarea from "@/ui/Textarea"
import { useState } from "react"
import { DeleteIcon } from "@/ui/Icons"
import Avatar from "@/assets/Avatar.png"
import ButtonDefault from "@/ui/Buttons/Default"

const PsychProfile = () => {
    const [bio, setBio] = useState("")
    const data = [
        { year: "2022", text: `Московский Гештальт Институт. Специализация "Зависимость и зависимые отношения. Гештальт-подход".` },
        { year: "2021", text: `Московский Гештальт Институт. Теория и практика гештальт-терапии.` },
        { year: "2019", text: `Московский Гештальт Институт. Специализация "Гештальт-подход в работе с травматическими переживаниями".` },
        { year: "2016", text: `Белорусский государственный педагогический университет имени М. Танка. Социальная педагогика с дополнительной специальностью "Практическая психология".` },
    ]

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Column}>
                    <div className={styles.AvatarBox}>
                        <div className={styles.Avatar}>
                            <img src={Avatar} alt="" />
                            <div><DeleteIcon /></div>
                        </div>

                        <button>Изменить фото</button>
                    </div>

                    <div className={styles.Form}>
                        <label>Имя Фамилия</label>
                        <Input onChange={() => ({})} placeholder="Имя Фамилия" type="text" value="Иван Иванов" />

                        <label>Пол</label>
                        <Input onChange={() => ({})} placeholder="Пол" type="text" value="Мужской" />

                        <label>Дата рождения</label>
                        <Input onChange={() => ({})} placeholder="Дата рождения" type="text" value="01.01.1990" />

                        <label>Язык консультаций</label>
                        <div className={styles.InputList}><InputItem text="Русский" /></div>

                        <label>Обо мне</label>
                        <Textarea onChange={e => setBio(e.target.value)} placeholder="Введите текст" value={bio} />
                    </div>

                    <div className={styles.Memo}>
                        <p>Данное описание будет видно потенциальным клиентам, Здесь вы можете указать:</p>
                        <ul>
                            <li>Как вы можете помочь клиентам;</li>
                            <li>С какими запросами и клиентами вы работаете;</li>
                            <li>Каких принципов работы вы придерживаетесь.</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.Column}>
                    <div className={styles.Box}>
                        <label>Образование</label>

                        <div className={styles.Memo}>Изменение и добавление данных об образовании возможно только через обращение в службу поддержки с прикреплением подтверждающих документов</div>

                        <div className={styles.Edu}>
                            {data.map((item, index) => (
                                <div key={index}>
                                    <h5>{item.year}</h5>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ButtonDefault disabled={false} onClick={() => ({})}>Сохранить</ButtonDefault>
                </div>
            </section>
        </main>
    )
}

export default PsychProfile