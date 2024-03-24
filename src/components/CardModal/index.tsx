import { CheckIcon, CloseIcon, InfoIcon, ScanIcon } from '@/ui/Icons'
import styles from './style.module.css'
import ButtonDefault from '@/ui/Buttons/Default'
import { FC, useState } from 'react'
import useGlobalStore from '@/store'

interface Props {
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const CardModal: FC<Props> = ({ setActive }) => {
    const [number, setNumber] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [cvv, setCvv] = useState("")
    const cardList = useGlobalStore(state => state.cardList)
    const changeCardList = useGlobalStore(state => state.changeCardList)
    const [isAdd, setIsAdd] = useState(false)

    function addCard() {
        changeCardList([...cardList, { number, cvv, dateEnd }])
        setIsAdd(true)
    }

    return (
        <div className={styles.Modal}>
            <div className={styles.Box}>
                <CloseIcon className={styles.Close} onClick={() => setActive(false)} />

                {isAdd
                    ? <div className={styles.Message}>
                        <CheckIcon />
                        Карта добавлена
                    </div>
                    : <><h2>Новая карта</h2>

                        <div className={styles.Inputs}>
                            <div className={styles.InputBox}>
                                <input maxLength={16} type="text" placeholder='Номер карты' value={number} onChange={e => setNumber(e.target.value)} />
                                <ScanIcon />
                            </div>

                            <div className={styles.Row}>
                                <div className={styles.InputBox}>
                                    <input maxLength={5} type="text" placeholder='Срок действия' value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
                                </div>
                                <div className={styles.InputBox}>
                                    <input maxLength={3} type="text" placeholder='CVV' value={cvv} onChange={e => setCvv(e.target.value)} />
                                    <InfoIcon />
                                </div>
                            </div>
                        </div>

                        <ButtonDefault disabled={number === "" || dateEnd === "" || cvv === ""} onClick={() => addCard()}>Привязать карту </ButtonDefault></>
                }
            </div>
        </div>
    )
}

export default CardModal