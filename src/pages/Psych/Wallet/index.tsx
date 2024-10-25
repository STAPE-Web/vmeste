import PsychSidebar from '@/components/PsyhSidebar';
import styles from "./style.module.css";
import { ArrowLeftIcon, CloseIcon, DotsIcon } from '@/ui/Icons';
import { fillPaymentColor } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentAPI, PshycologistsAPI } from '@/api';
import { IPayment } from '@/types';
import ButtonDefault from '@/ui/Buttons/Default';
import Input from '@/ui/Input';

const Wallet = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState<IPayment[]>([]);
    const sid = JSON.parse(localStorage.getItem("sid") as string);
    const [currentPayment, setCurrentPayment] = useState<IPayment | null>(null);
    const [accept, setAccept] = useState(false);
    const [cardNumber, setCardNumber] = useState("");

    const getData = useCallback(async () => {
        const result = await PshycologistsAPI.payments(sid);
        setData(result.payments);
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    function selectPayment(item: IPayment) {
        setModal(true);
        setCurrentPayment(item);
    }

    useEffect(() => {
        const cardNumber = JSON.parse(localStorage.getItem("cardNumber") as string)
        setAccept(cardNumber !== null && cardNumber !== undefined)
    }, [])

    async function ConnectPayment() {
        const result = await PaymentAPI.addPayment(cardNumber);
        if (result.status === 200) {
            localStorage.setItem("cardNumber", JSON.stringify(cardNumber))
            setAccept(true)
        }
    }

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <div className={styles.Top}>
                    <ArrowLeftIcon onClick={() => navigate(-1)} className={styles.Back} />
                    <h2>Выплаты</h2>
                    <DotsIcon onClick={() => setMenu(!menu)} />

                    {menu && <div className={styles.Download} onClick={() => setMenu(false)}>Скачать историю выплат в XLSX</div>}
                </div>

                {accept ? <div className={styles.Grid}>
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
                                        <span>{item.dateSession.split(" ")[0]}</span>
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
                    : <div className={styles.ConnectPayment}>
                        <h2>Пока нет выплат</h2>
                        <p>Подключите свой аккаунт к сервису Юкасса, чтобы получать выплаты</p>
                        <Input onChange={e => setCardNumber(e.target.value)} placeholder='Введите номер карты' type='number' value={cardNumber} />
                        <ButtonDefault disabled={cardNumber.length < 16 || cardNumber.length > 16} onClick={() => ConnectPayment()}>Подключить</ButtonDefault>
                    </div>
                }
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
                                <p>{currentPayment?.dateSession.split(" ")[0]}</p>
                            </div>

                            <div>
                                <p>Цена сессии</p>
                                <p>{currentPayment?.price} ₽</p>
                            </div>

                            <div>
                                <p>Источник платежа</p>
                                <p>Физлицо</p>
                            </div>

                            <div>
                                <p>Сумма выплаты</p>
                                {currentPayment && <h3>{currentPayment?.price - (currentPayment?.price * 0.02)} ₽</h3>}
                            </div>

                            {/* <div>
                                <p>Налогооблагаемая база</p>
                                <p>2 850 ₽</p>
                            </div> */}

                            {/* <div>
                                <p>Дата выплаты</p>
                                <p>10.01.2024</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>}
        </main>
    );
}

export default Wallet;