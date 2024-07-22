import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { IPsyhProfile } from "@/types"
import { useState } from "react"
import { ProfileAPI } from "@/api"
import useGlobalStore from "@/store"

const Methods = () => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    // const [userData, setUserData] = useState<IPsyhProfile>(JSON.parse(localStorage.getItem("userData") as string));
    const methodList = ["Психоаналитическая терапия", "Транзактный анализ", "Экзистенциальная терапия", "Когнитивно-поведенческая терапия", "Юнгианский анализ", "Психодрама", "Телесно-ориентированная терапия", "Символдрама"]
    const typeList = ["Индивидуальные", "Парные"]
    const [disabled, setDisabled] = useState(true)
    const userData: IPsyhProfile | null = useGlobalStore(state => state.psychData)
    const changePsychData = useGlobalStore(state => state.changePsychData)

    async function saveChanges() {
        if (userData) {
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
    }

    function handleClick(type: "methods" | "therapy", name: string) {
        if (userData) {
            setDisabled(false);

            if (type === "methods") {
                const newMethods = userData.methods.includes(name)
                    ? userData.methods.filter(i => i !== name)
                    : [...userData.methods, name];

                const updatedUserData = { ...userData, methods: newMethods };
                changePsychData(updatedUserData);
                localStorage.setItem("userData", JSON.stringify(updatedUserData));
            }

            if (type === "therapy") {
                let newTherapy;

                if (userData.therapy === "Любые") {
                    newTherapy = name;
                } else if (userData.therapy === name) {
                    newTherapy = "";
                } else if (!userData.therapy) {
                    newTherapy = name;
                } else {
                    newTherapy = "Любые";
                }

                const updatedUserData = { ...userData, therapy: newTherapy };
                changePsychData(updatedUserData);
                localStorage.setItem("userData", JSON.stringify(updatedUserData));
            }
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
                <p>Выберите методы, в которых вы работаете онлайн</p>
                {methodList.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => handleClick("methods", item)}>
                        <Checkbox state={userData !== null && (userData.methods.some(i => i === item))} />
                        {item}
                    </div>
                ))}

                <label className={styles.Margin}>Вид терапии</label>
                {typeList.map((item, index) => (
                    <div key={index} className={styles.Item} onClick={() => handleClick("therapy", item)}>
                        <Checkbox state={userData !== null && (userData.therapy === "Любые" || userData.therapy === item)} />
                        {item}
                    </div>
                ))}

                <ButtonDefault disabled={disabled} onClick={() => saveChanges()}>Сохранить</ButtonDefault>
            </section>
        </main>
    )
}

export default Methods