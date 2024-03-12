import styles from "./style.module.css"
import AppStore from "@/assets/AppStore.png"
import GooglePlay from "@/assets/GooglePlay.png"

const Section11 = () => {
    return (
        <section className={styles.Section}>
            <div className={styles.Box}>
                <h2>Скачивайте мобильное <br /> приложение <span>«ВМЕСТЕ»</span></h2>
                <img src={AppStore} alt="" />
                <img src={GooglePlay} alt="" />
            </div>
        </section>
    )
}

export default Section11