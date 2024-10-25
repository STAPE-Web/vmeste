import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type: "tel" | "text" | "number" | "date"
    placeholder: string
    code?: string
}

const Input: FC<Props> = ({ onChange, type, value, placeholder, code }) => {
    return (
        <div className={`${styles.Input} ${value.length > 0 ? styles.Active : ""}`}>
            {type === "tel" && <div>{code}</div>}
            <input onChange={onChange} type={type === "tel" ? "number" : type} maxLength={type === "tel" ? 10 : 254} value={value} placeholder={placeholder} pattern={type === "tel" ? "[0-9]*" : ""} readOnly={String(onChange) === "() => ({})"} />
        </div>
    )
}

export default Input