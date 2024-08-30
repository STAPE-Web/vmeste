import ButtonDefault from "@/ui/Buttons/Default"
import styles from "./style.module.css"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SessionAPI } from "@/api"

const Success = () => {
    const { id } = useParams()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const navigate = useNavigate()

    const bookSession = useCallback(async () => {
        const res = await SessionAPI.book({ sid, paymentId: id })
        console.log(res)
    }, [id])

    useEffect(() => {
        bookSession()
    }, [bookSession])

    return (
        <section className={styles.Section}>
            <h1>Вы успешно оплатили сессию</h1>
            <ButtonDefault disabled={false} onClick={() => navigate("/sessions")}>К сессиям</ButtonDefault>
        </section>
    )
}

export default Success