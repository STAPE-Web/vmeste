import Russian from "@/assets/Russian"
import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    language: "RU" | "EN"
    setLanguage: React.Dispatch<React.SetStateAction<"RU" | "EN">>
}

const Language: FC<Props> = () => {
    return (
        <div className={styles.Language}>
            <Russian />

            <div className={styles.Items}>
                <p>RU</p>
                <div className={styles.Line} />
                <p>EN</p>
            </div>
        </div>
    )
}

export default Language