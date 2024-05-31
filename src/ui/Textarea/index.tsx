import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder: string
}

const Textarea: FC<Props> = (props) => {
    return (
        <textarea className={styles.Textarea} {...props} />
    )
}

export default Textarea