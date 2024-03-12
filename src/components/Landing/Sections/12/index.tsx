import styles from "./style.module.css"
import Image1 from "@/assets/Forbes.png"
import Image2 from "@/assets/Sobaka.png"
import Image3 from "@/assets/RBK.png"
import Image4 from "@/assets/RBRU.png"

const Section12 = () => {
    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>О нас пишут:</h2>
                <div>
                    <img src={Image1} alt="" />
                    <img src={Image2} alt="" />
                    <img src={Image3} alt="" />
                    <img src={Image4} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Section12