import { Like2Icon } from "@/ui/Icons"
import styles from "./styles.module.css"
import { ISpecialist } from "@/types"
import { FC, useCallback, useEffect, useState } from "react"
import { PshycologistsAPI } from "@/api"
import { useNavigate } from "react-router-dom"


interface Props {
    getProfile: () => Promise<void>
}

const SavedList: FC<Props> = ({ getProfile }) => {
    const navigate = useNavigate()
    const [listData, setData] = useState<ISpecialist[]>([])
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const getSpecialist = useCallback(async () => {
        const result = await PshycologistsAPI.get(sid, { familyTherapy: true, gender: "M", prices: [2500, 3500, 4500], themes: ["Стресс"] })
        setData(result.psychologists)
    }, [sid])

    useEffect(() => {
        getSpecialist()
    }, [getSpecialist])

    async function deleteLike(id: string) {
        await PshycologistsAPI.like(sid, "delete", "psychologists", id)
        await getSpecialist()
        await getProfile()
    }

    return (
        <div className={styles.List}>
            {listData.filter((i) => i.isFavourite).map((i, id) => (<div key={id}>
                <Like2Icon onClick={() => deleteLike(i.id)} />

                <img src={i.urlAvatar} alt="" />
                <h3>{i.name}</h3>
                <p>Индивидуальная сессия {i.individualSession.countTime} мин</p>
                <h4>{i.individualSession.price} ₽</h4>
                <button onClick={() => navigate(`/specialist/${i.id}`)}>Выбрать</button>
            </div>))}
        </div>
    )
}

export default SavedList