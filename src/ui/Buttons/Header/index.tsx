import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    children: any
    onClick: () => void
    disabled: boolean
}

const ButtonHeader: FC<Props> = ({ children, onClick, disabled }) => {
    return (
        <button disabled={disabled} className={styles.Button} onClick={onClick}>{children}</button>
    )
}

export default ButtonHeader