import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    children: any
    onClick: () => void
    disabled: boolean
    big: boolean
}

const ButtonRound: FC<Props> = ({ children, onClick, disabled, big }) => {
    return (
        <button disabled={disabled} className={`${styles.Button} ${big ? styles.Big : ""}`} onClick={onClick}>{children}</button>
    )
}

export default ButtonRound