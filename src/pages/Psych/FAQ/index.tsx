import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import { ArrowLeftIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import FaqItem from "@/components/FaqItem"
import { faqList } from "@/constants"

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

                <div className={styles.List}>
                    {faqList.map((item, index) => (
                        <FaqItem key={index} item={item} isFaq />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default FAQ