import { ArrowDownIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { FC, useState } from "react"

interface Props {
    item: {
        title: string
        text: string
    }
    isFaq?: boolean
}

const FaqItem: FC<Props> = ({ item, isFaq }) => {
    const [active, setActive] = useState(false)

    return (
        <div className={`${styles.Item} ${active ? styles.Active : ""}`} onClick={() => setActive(!active)}>
            <div className={`${styles.Select} ${isFaq ? styles.isFaq : ""}`}>
                {item.title}
                <ArrowDownIcon width={24} height={24} />
            </div>

            <div className={styles.DropDown}>
                {item.text}
            </div>
        </div>
    )
}

export default FaqItem