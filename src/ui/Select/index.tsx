import Russian from "@/assets/Russian"
import { FC, useState } from "react"
import styles from "./style.module.css"
import { ArrowDownIcon } from "../Icons"

interface Props {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Select: FC<Props> = ({ setValue, value }) => {
    const [active, setActive] = useState(false)

    return (
        <div className={`${styles.Select} ${active ? styles.Active : ""}`}>
            <div onClick={() => setActive(!active)} className={styles.Touchable}>
                <div>
                    <Russian />
                    <p>{value}</p>
                </div>

                <ArrowDownIcon />
            </div>

            <div className={styles.DropDown} onClick={() => setValue("Россия")}></div>
        </div>
    )
}

export default Select