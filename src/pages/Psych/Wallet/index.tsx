import PsychSidebar from '@/components/PsyhSidebar'
import styles from "./style.module.css"
import { ArrowLeftIcon, CloseIcon, DotsIcon } from '@/ui/Icons'
import { fillPaymentColor } from '@/utils'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PshycologistsAPI } from '@/api'

const Wallet = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [menu, setMenu] = useState(false)
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    const items = [
        { type: "Запланировано", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
        { type: "Выплачено", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
        { type: "Выплачено", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
        { type: "Выплачено", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
        { type: "Выплачено", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
        { type: "Выплачено", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
        { type: "Выплачено", id: "3668298", price: 1717, sessionDate: "07.01.2024", paymentDate: "10.01.2024" },
    ]

    const getData = useCallback(async () => {
        const result = await PshycologistsAPI.payments(sid)
        console.log(result)
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

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
                    {items.map((item, index) => (
                        <div key={index} className={styles.Item} onClick={() => setModal(true)}>
                            <div className={styles.Row}>
                                <div style={{ background: fillPaymentColor(item.type) }} className={styles.Type}>{item.type}</div>
                                <p className={styles.ID}>№{item.id}</p>
                            </div>

                            <div className={styles.Row}>
                                <div className={styles.Box}>
                                    <div className={styles.Column}>
                                        <p>Дата сессии:</p>
                                        <span>{item.sessionDate}</span>
                                    </div>

                                    <div className={styles.Column}>
                                        <p>Дата выплаты</p>
                                        <span>{item.paymentDate}</span>
                                    </div>
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
                            <h2>Выплата №3668298</h2>
                            <div style={{ background: fillPaymentColor("Запланировано") }} className={styles.Type}>Запланировано</div>
                        </div>

                        <div className={styles.ModalList}>
                            <div>
                                <p>Клиент</p>
                                <p><span>Виктория</span> <br /> #985443</p>
                            </div>

                            <div>
                                <p>Дата сессии</p>
                                <p>07.01.2024</p>
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