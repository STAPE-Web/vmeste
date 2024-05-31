import { FC } from "react"
import { CloseIcon } from "../Icons"
import styles from "./style.module.css"

interface Props {
    text: string,
}

const InputItem: FC<Props> = ({ text }) => {
    return (
        <div className={styles.InputItem}>
            <CloseIcon />
            <div />
            {text}
        </div>
    )
}

export default InputItem