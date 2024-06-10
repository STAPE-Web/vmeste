import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import Input from "@/ui/Input"
import InputItem from "@/ui/InputItem"
import Textarea from "@/ui/Textarea"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeftIcon, DeleteIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import { useNavigate } from "react-router-dom"
import { PshycologistsAPI } from "@/api"
import { IPsyhProfile } from "@/types"

const PsychProfile = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<IPsyhProfile | null>(null)
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const degreeList = ["Бакалавр", "Магистр", "Кандидат наук", "Доктор наук"]

    const getData = useCallback(async () => {
        const result = await PshycologistsAPI.getProfile(sid)
        setData(result)
    }, [sid])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.MobileHeader}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h3>Настройка профиля</h3>
                    <div />
                </div>

                <div className={styles.Column}>
                    <div className={styles.AvatarBox}>
                        <div className={styles.Avatar}>
                            <img src={data?.photoUrl} alt="" />
                            <div><DeleteIcon /></div>
                        </div>

                        <button>Изменить фото</button>
                    </div>

                    <div className={styles.Form}>
                        <label>Имя Фамилия</label>
                        <Input onChange={() => ({})} placeholder="Имя Фамилия" type="text" value={data?.name || ""} />

                        <label>Пол</label>
                        <Input onChange={() => ({})} placeholder="Пол" type="text" value={data?.gender === "M" ? "Мужской" : "Женский" || ""} />

                        <label>Дата рождения</label>
                        <Input onChange={() => ({})} placeholder="Дата рождения" type="text" value={data?.bday || ""} />

                        <label>Язык консультаций</label>
                        <div className={styles.InputList}>{data?.language.map((item, index) => <InputItem key={index} text={item} />)}</div>

                        <label>Обо мне</label>
                        <Textarea onChange={() => ({})} placeholder="Введите текст" value={data?.bio || ""} />
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
                            {data?.educ.map((item, index) => (
                                <div key={index}>
                                    <h5>{item.year}</h5>
                                    <p>{item.name} - {item.faculty} - {degreeList[item.degree - 1]}</p>
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