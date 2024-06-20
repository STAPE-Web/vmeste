import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { IPsyhProfile } from "@/types"
import { useState } from "react"
import { formatMethods, formatTherapy } from "@/utils"
import { ProfileAPI } from "@/api"

const Methods = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [userData, setUserData] = useState<IPsyhProfile>(JSON.parse(localStorage.getItem("userData") as string))
    const methodList = ["Психоаналитическая терапия", "Транзактный анализ", "Системная терапия", "Гештальт-терапия", "Экзистенциальная терапия", "Когнитивно-поведенческая терапия", "Юнгианский анализ", "Психодрама", "Телесно-ориентированная терапия", "Символдрама"]
    const typeList = ["Индивидуальная", "Парная"]
    const [disabled, setDisabled] = useState(true)

    async function saveChanges() {
        const result = await ProfileAPI.editProfile({
            sid: sid,
            bio: userData?.bio,
            languages: userData?.language,
            photo: userData.photoUrl,
            methods: userData?.methods,
            therapy: userData?.therapy
        })
        console.log(result)
        alert("Успешно сохранено")
    }

    function handleClick(type: "methods" | "therapy", name: string) {
        setDisabled(false)
        if (type === "methods") {
            const newMethods = userData.methods.includes(name)
                ? userData.methods.filter(i => i !== name)
                : [...userData.methods, name];

            const updatedUserData = { ...userData, methods: newMethods };

            setUserData(updatedUserData);
            localStorage.setItem("userData", JSON.stringify(updatedUserData))
        }
        if (type === "therapy") {
            const updatedUserData = { ...userData, therapy: name };
            setUserData(updatedUserData);
            localStorage.setItem("userData", JSON.stringify(updatedUserData))
        }
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.MobileHeader}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} />
                    <h3>Метод и специализация</h3>
                    <div />
                </div>

                <label>Методы терапии</label>
                <p>Выберите 1-2 метода, в которых вы работаете онлайн</p>
                {methodList.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => handleClick("methods", formatMethods(item))}>
                        <Checkbox state={userData.methods.some(i => i === formatMethods(item))} />
                        {item}
                    </div>
                ))}

                <label className={styles.Margin}>Вид терапии</label>
                {typeList.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => handleClick("therapy", formatTherapy(item))}>
                        <Checkbox state={formatTherapy(userData.therapy) === item} />
                        {item}
                    </div>
                ))}

                <ButtonDefault disabled={disabled} onClick={() => saveChanges()}>Сохранить</ButtonDefault>
            </section>
        </main>
    )
}

export default Methods