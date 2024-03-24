import Russian from "@/assets/Russian"
import { FC } from "react"
import styles from "./style.module.css"
import { ArrowDownIcon } from "../Icons"

interface Props {
    value: string
    selectActive: React.Dispatch<React.SetStateAction<boolean>>
    active: boolean
}

const Select: FC<Props> = ({ value, selectActive, active }) => {
    return (
        <div className={`${styles.Select} ${active ? styles.Active : ""}`}>
            <div onClick={() => {
                selectActive(!active)
            }} className={styles.Touchable}>
                <div>
                    {value === "Россия" && <Russian />}
                    <p>{value}</p>
                </div>

                <ArrowDownIcon />
            </div>
        </div>
    )
}

export default Select