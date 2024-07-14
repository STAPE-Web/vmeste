import PsychSidebar from '@/components/PsyhSidebar'
import styles from "./style.module.css"
import { ArrowLeftIcon, CloseIcon, DotsIcon } from '@/ui/Icons'
import { fillPaymentColor, formatDate } from '@/utils'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PshycologistsAPI } from '@/api'
import { IPayment } from '@/types'

const Wallet = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [menu, setMenu] = useState(false)
    const [data, setData] = useState<IPayment[]>([])
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [currentPayment, setCurrentPayment] = useState<IPayment | null>(null)

    const getData = useCallback(async () => {
        const result = await PshycologistsAPI.payments(sid)
        setData(result.payments)
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    function selectPayment(item: IPayment) {
        setModal(true)
        setCurrentPayment(item)
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} className={styles.Back} />
                    <h2>Выплаты</h2>
                    <DotsIcon onClick={() => setMenu(!menu)} />

                    {menu && <div className={styles.Download} onClick={() => setMenu(false)}>Скачать историю вылат в XLSX</div>}
                </div>

                <div className={styles.Grid}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.Item} onClick={() => selectPayment(item)}>
                            <div className={styles.Row}>
                                <div style={{ background: fillPaymentColor("Выплачено") }} className={styles.Type}>Выплачено</div>
                                {/* <p className={styles.ID}>№{item.id}</p> */}
                            </div>

                            <div className={styles.Row}>
                                <div className={styles.Box}>
                                    <div className={styles.Column}>
                                        <p>Дата сессии:</p>
                                        <span>{formatDate(item.dateSession)}</span>
                                    </div>

                                    {/* <div className={styles.Column}>
                                        <p>Дата выплаты</p>
                                        <span>{item.paymentDate}</span>
                                    </div> */}
                                </div>

                                <h3>{item.price} ₽</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {modal && <div className={styles.Modal}>
                <div className={styles.ModalBox}>
                    <CloseIcon onClick={() => setModal(false)} />

                    <h2>Детали</h2>

                    <div className={styles.ModalInfo}>
                        <div className={styles.ModalTop}>
                            <h2>Выплата №{currentPayment?.id}</h2>
                            <div style={{ background: fillPaymentColor("Выплачено") }} className={styles.Type}>Выплачено</div>
                        </div>

                        <div className={styles.ModalList}>
                            <div>
                                <p>Клиент</p>
                                <p><span>{currentPayment?.userName}</span></p>
                            </div>

                            <div>
                                <p>Дата сессии</p>
                                {/* <p>{formatDate(currentPayment?.dateSession)}</p> */}
                            </div>

                            <div>
                                <p>Цена сессии</p>
                                <p>2 850 ₽</p>
                            </div>

                            <div>
                                <p>Источник платежа</p>
                                <p>Физлицо</p>
                            </div>

                            <div>
                                <p>Сумма выплаты</p>
                                <h3>1 717 ₽</h3>
                            </div>

                            <div>
                                <p>Налогооблагаемая база</p>
                                <p>2 850 ₽</p>
                            </div>

                            <div>
                                <p>Дата выплаты</p>
                                <p>10.01.2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </main>
    )
}

export default Wallet