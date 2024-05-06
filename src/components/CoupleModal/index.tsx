import { FC } from "react"
import styles from "./style.module.css"
import { CloseIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import { couplesList } from "./constants"

interface Props {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    coupleTerapy: string[]
    setCoupleTerapy: React.Dispatch<React.SetStateAction<string[]>>
}

const CouplesModal: FC<Props> = ({ coupleTerapy, setCoupleTerapy, setModal }) => {
    function selectItem(items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>, value: string) {
        if (items.includes(value)) {
            const updatedItems = items.filter(i => i !== value);
            setItems(updatedItems);
        } else {
            setItems(prevItems => [...prevItems, value]);
        }
    }

    return (
        <div className={styles.Modal}>
            <div className={styles.ModalBox}>
                <div className={styles.Top}>
                    <span></span>
                    <div className={styles.Line}></div>
                    <div className={styles.CloseIcon} onClick={() => setModal(false)}>
                        <CloseIcon width={10} height={10} />
                    </div>
                </div>

                <div className={styles.DesktopTop}>
                    <h2>Какие темы хотели бы обсудить в первую очередь?</h2>
                    <p>Расскажите о своем запросе. Отмечайте всё, что у вас отзывается</p>
                </div>

                <h2>Парная терапия</h2>
                <div className={styles.List}>
                    {couplesList.map((i, index) => (
                        <div key={index}
                            className={coupleTerapy.includes(i.name) ? styles.Active : ""}
                            onClick={() => selectItem(coupleTerapy, setCoupleTerapy, i.name)}
                        >
                            <i.icon width={24} height={24} />
                            {i.name}
                        </div>
                    ))}
                </div>

                <ButtonDefault disabled={false} onClick={() => setModal(false)}>Сохранить</ButtonDefault>
            </div>
        </div>
    )
}

export default CouplesModal