import { ArrowDownIcon, ArrowRightIcon, CardIcon, SBPIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { FC, useState } from "react"
import useGlobalStore from "@/store"
import Mastercard from "@/ui/Icons/Mastercard"

interface Props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectPayment: FC<Props> = ({ setModal }) => {
    const [active, setActive] = useState(false)
    const cardList = useGlobalStore(state => state.cardList)
    const list = [
        { icon: CardIcon, name: "Привязать карту", action: () => setModal(true) },
        { icon: SBPIcon, name: "Добавить счёт СБП", action: () => ({}) },
    ]

    return (
        <div className={`${styles.Select} ${active ? styles.Active : ""}`}>
            <div className={styles.Touchable} onClick={() => setActive(!active)}>
                Выберите способ оплаты
                <ArrowDownIcon />
            </div>

            <div className={styles.DropDown}>
                {list.filter(i => i.name === "Привязать карту").map((i, index) => (
                    <div key={index} className={styles.Item} onClick={() => i.action()}>
                        <div>
                            <i.icon />
                            {i.name}
                        </div>

                        <ArrowRightIcon />
                    </div>
                ))}

                {cardList.map((i, index) => (
                    <div key={index} className={styles.Item}>
                        <div>
                            <Mastercard />
                            {`MasterCard ****${i.number.substring(i.number.length - 4)} `}
                        </div>

                        <ArrowRightIcon />
                    </div>
                ))}


                {list.filter(i => i.name !== "Привязать карту").map((i, index) => (
                    <div key={index} className={styles.Item} onClick={() => i.action()}>
                        <div>
                            <i.icon />
                            {i.name}
                        </div>

                        <ArrowRightIcon />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectPayment