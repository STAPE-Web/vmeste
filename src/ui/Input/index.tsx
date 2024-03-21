import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type: "tel" | "text" | "number"
    placeholder: string
}

const Input: FC<Props> = ({ onChange, type, value, placeholder }) => {
    return (
        <div className={`${styles.Input} ${value.length > 0 ? styles.Active : ""}`}>
            {type === "tel" && <div>+7</div>}
            <input onChange={onChange} type={type} maxLength={type === "tel" ? 10 : 254} value={value} placeholder={placeholder} />
        </div>
    )
}

export default Input