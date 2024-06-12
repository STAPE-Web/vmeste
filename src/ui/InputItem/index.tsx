import { FC } from "react"
import { CloseIcon } from "../Icons"
import styles from "./style.module.css"

interface Props {
    text: string,
    onClick: () => void
}

const InputItem: FC<Props> = ({ text, onClick }) => {
    return (
        <div className={styles.InputItem}>
            <CloseIcon onClick={onClick} />
            <div />
            {text}
        </div>
    )
}

export default InputItem