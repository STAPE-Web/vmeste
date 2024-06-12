import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import Input from "@/ui/Input"
import InputItem from "@/ui/InputItem"
import Textarea from "@/ui/Textarea"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeftIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import { useNavigate } from "react-router-dom"
import { ProfileAPI, PshycologistsAPI, UploadAPI } from "@/api"
import { IPsyhProfile } from "@/types"

const PsychProfile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<IPsyhProfile | null>(null);
    const sid = JSON.parse(localStorage.getItem("sid") as string);
    const degreeList = ["Бакалавр", "Магистр", "Кандидат наук", "Доктор наук"];
    const [disabled, setDisabled] = useState(true);
    const [image, setImage] = useState<File | null>(null);
    const [newImage, setNewImage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [lang, setLang] = useState("")

    const getData = useCallback(async () => {
        const result = await PshycologistsAPI.getProfile(sid)
        setData(result)
    }, [sid])

    useEffect(() => {
        getData()
    }, [getData])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const uploadPhotos = useCallback(async () => {
        if (image !== null) {
            const result = await UploadAPI.image(image)
            console.log(result)
            if (result.status === 200) {
                setNewImage(result.imageId)
                alert(result.msg)
                setDisabled(false)
            }
            setImage(null);
        }
    }, [image, setNewImage])

    useEffect(() => {
        if (image !== null) {
            uploadPhotos();
        }
    }, [image, uploadPhotos]);

    async function saveChanges() {
        if (data !== null) {
            const result = await ProfileAPI.editProfile({
                sid: sid,
                bio: data?.bio,
                languages: data?.language,
                photo: newImage,
                methods: data?.methods,
                therapy: data?.therapy
            })
            console.log(result)
            alert("Успешно сохранено")
        }
    }

    function handleInput(value: string) {
        setDisabled(false)
        if (data !== null) {
            setData({ ...data, bio: value })
        }
    }

    function handleLang(e: React.KeyboardEvent<HTMLInputElement>) {
        setDisabled(false);

        if (e.key === "Enter" && lang.trim() !== "") {
            e.preventDefault();
            if (data !== null) {
                setData({ ...data, language: [...data.language, lang.trim()] });
            }
            setLang("");
        }

        if (e.key === "Backspace" && lang === "") {
            if (data !== null && data.language.length > 0) {
                setData({ ...data, language: data.language.slice(0, -1) });
            }
        }
    }

    function deleteLang(index: number) {
        if (data !== null) {
            const newData = { ...data }
            newData.language = newData.language?.filter((_, i) => i !== index);
            setData(newData)
        }
    }

    const handleBlur = () => {
        if (data !== null && lang !== "") {
            setData({ ...data, language: [...data.language, lang.trim()] });
            setLang("");
        }
    };

    async function deleteAccount() {
        const result = await ProfileAPI.delete(sid)
        console.log(result)
        if (result.status === 200) {
            window.location.href = "/"
            localStorage.clear()
        }
    }

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
                            {/* <div><DeleteIcon /></div> */}
                        </div>

                        <button onClick={() => handleButtonClick()}>Изменить фото</button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className={styles.Form}>
                        <label>Имя Фамилия</label>
                        <div className={styles.Disabled}>
                            <Input onChange={() => ({})} placeholder="Имя Фамилия" type="text" value={data?.name || ""} />
                        </div>

                        <label>Пол</label>
                        <div className={styles.Disabled}>
                            <Input onChange={() => ({})} placeholder="Пол" type="text" value={data?.gender === "M" ? "Мужской" : "Женский" || ""} />
                        </div>

                        <label>Дата рождения</label>
                        <div className={styles.Disabled}>
                            <Input onChange={() => ({})} placeholder="Дата рождения" type="text" value={data?.bday || ""} />
                        </div>

                        <label>Язык консультаций</label>
                        <div className={styles.InputListBox}>
                            <div className={styles.InputList}>
                                {data?.language.map((item, index) => <InputItem onClick={() => deleteLang(index)} key={index} text={item} />)}
                                <input type="text" value={lang} onChange={e => setLang(e.target.value)} onKeyDown={handleLang} onBlur={handleBlur} />
                            </div>
                        </div>

                        <label>Обо мне</label>
                        <Textarea onChange={e => handleInput(e.target.value)} placeholder="Введите текст" value={data?.bio || ""} />
                    </div>

                    <div className={styles.Memo}>
                        <p>Данное описание будет видно потенциальным клиентам, Здесь вы можете указать:</p>
                        <ul>
                            <li>Как вы можете помочь клиентам;</li>
                            <li>С какими запросами и клиентами вы работаете;</li>
                            <li>Каких принципов работы вы придерживаетесь.</li>
                        </ul>
                    </div>

                    <button className={styles.DeleteAccount} onClick={() => deleteAccount()}>Удалить Аккаунт</button>
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

                    <ButtonDefault disabled={disabled} onClick={() => saveChanges()}>Сохранить</ButtonDefault>
                </div>
            </section>
        </main>
    )
}

export default PsychProfile