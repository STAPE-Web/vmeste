import { FC, useState } from "react"
import { ArrowDownIcon } from "../Icons"
import styles from "./style.module.css"

interface Props {
    value: string
    array: string[]
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Select: FC<Props> = ({ array, setValue, value }) => {
    const [active, setActive] = useState(false)

    function selectItem(item: string) {
        setValue(item)
        setActive(false)
    }

    return (
        <div className={styles.Select}>
            <div className={styles.Value} onClick={() => setActive(!active)}>{value} <ArrowDownIcon /></div>

            {active && <div className={styles.DropDown}>{array.map((item, i) => (
                <div key={i} className={item === value ? styles.Active : ""} onClick={() => selectItem(item)}>{item}</div>
            ))}</div>}
        </div>
    )
}

export default Select