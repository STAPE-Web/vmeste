import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

const FAQ = () => {
    const navigate = useNavigate()

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} className={styles.Back} />
                    <h2>FAQ</h2>
                    <div />
                </div>
            </section>
        </main>
    )
}

export default FAQ