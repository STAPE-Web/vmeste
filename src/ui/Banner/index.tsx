import ButtonDefault from "../Buttons/Default"
import styles from "./style.module.css"

const Banner = () => {
    return (
        <div className={styles.Banner}>
            <h2>У вас пока нет сессий</h2>
            <ButtonDefault onClick={() => ({})} disabled={false}>Выбрать психолога</ButtonDefault>
        </div>
    )
}

export default Banner