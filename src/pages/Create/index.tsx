import { useEffect, useState } from "react"
import styles from "./style.module.css"
import StepLine from "@/ui/StepLine"
import ButtonRound from "@/ui/Buttons/Round"
import { Add2Icon, ArrowLeftIcon, ArrowRightIcon } from "@/ui/Icons"
import Input from "@/ui/Input"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"
import Textarea from "@/ui/Textarea"
import { generateYearsArray } from "@/utils"
import Select from "@/ui/Select2"
import { ICreatePsyh } from "@/types"
import { AuthAPI } from "@/api"

const Create = () => {
    const [step, setStep] = useState(1)
    const [disable, setDisable] = useState(false)
    const [endRegister, setEndRegister] = useState(false)

    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")
    const genderList = ["Мужской", "Женский"]
    const [bday, setBday] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const [contact, setContact] = useState("")
    const [citizenship, setcitizenship] = useState("")
    const [socailMedia, setSocialMedia] = useState("")
    const [bio, setBio] = useState("")
    const [educ, setEduc] = useState<string[]>([])
    const [university, setUniversity] = useState("")
    const [endYear, setEndYear] = useState("")
    const yearList = generateYearsArray(2000);
    const [specialName, setSpecialName] = useState("")
    const [degree, setDegree] = useState("")
    const degreeList = ["Бакалавр", "Магистр", "Кандидат наук", "Доктор наук"]
    const extraEduList = ["Зависимости, аддикции", "Расстройство пищевого поведения", "Сексология", "Экстремальные ситуации, ПТСР", "Другое"]
    const [extraEdu, setExtraEdu] = useState<string[]>([])
    const [promComm, setpromComm] = useState("")
    const edu = `${endYear} - ${university} - ${specialName} - ${degree}`

    const [mainMethod, setmainMethod] = useState("")
    const mainMethodList = ["Психоанализ", "Юнгианский анализ", "Гештальтпсихология", "Когнитивно-поведенческая психология", "Нейро-лингвистическое программирование", "Психодрама", "Транзактный анализ", "Экзистенциальная психология", "Клиент-центрированная терапия", "Арт-терапия", "Телесно-ориентированная терапия"]
    const [consultStart, setconsultStart] = useState("")
    const [onlineExp, setonlineExp] = useState("")
    const [onlineExpInfo, setonlineExpInfo] = useState("")
    const [clients, setclients] = useState("")
    const [longestSession, setlongestSession] = useState("")
    const [personalTreopia, setpersonalTreopia] = useState("")

    const [myCondition, setMyCondition] = useState<string[]>([])
    const [relationship, setRelationship] = useState<string[]>([])
    const [work, setWork] = useState<string[]>([])
    const [events, setEvents] = useState<string[]>([])

    const [supervisions, setsupervisions] = useState("")
    const [anotherJob, setanotherJob] = useState("")
    const [vmesteClients, setvmesteClients] = useState("")
    const [psychProcess, setpsychProcess] = useState("")
    const [onlineTherapy, setonlineTherapy] = useState("")
    const [familyTherapy, setfamilyTherapy] = useState("")
    const [foundUs, setfoundUs] = useState("")
    const foundUsList = ["Рассказали коллеги / друзья", "Из рекламы", "Гештальтпсихология", "Нашла на сайте “Вместе” информацию о наборе", "Через поиск работы в интернете", "Другое"]

    const items = [
        { title: "Моё состояние", state: myCondition, func: setMyCondition, array: ["Стресс", "Упадок сил", "Нестабильная самооценка", "Приступы страха и тревоги", "Перепады настроения", "Раздражительность", "Ощущение одиночества", "Проблемы с концентрацией", "Эмоциональная зависимость", "Проблемы со сном", "Расстройство пищевого поведения", "Панические атаки", "Навязчивые мысли о здоровье", "Сложности с алкоголем/наркотиками"] },
        { title: "Отношения", state: relationship, func: setRelationship, array: ["С партнером", "С окружающими", "С родителями", "С детьми", "Сексуальные", "Сложности с ориентацией, ее поиск"] },
        { title: "Работа, учеба", state: work, func: setWork, array: ["Недостаток мотивации", "Выгорание", "«Не знаю, чем хочу заниматься»", "Прокрастинация", "Отсутствие цели", "Смена, потеря работы"] },
        { title: "События в жизни", state: events, func: setEvents, array: ["Переезд, эмиграция", "Беременность, рождение ребёнка", "Разрыв отношений, развод", "Финансовые изменения", "Утрата близкого человека", "Болезнь, своя и близких", "Насилие"] }
    ]

    // function checkItem(item: string, func: React.Dispatch<React.SetStateAction<string[]>>, state: string[]) {
    //     if (state.includes(item)) {
    //         func(state.filter(i => i !== item))
    //     } else {
    //         func(prev => [...prev, item])
    //     }
    // }

    function fillContent() {
        switch (step) {
            case 1: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <h3>Ваши Фамилия Имя Отчество*</h3>
                        <p>Пожалуйста, введите данные именно в таком порядке и с полным именем.</p>
                    </div>

                    <div className={styles.InputBox}>
                        <Input onChange={e => setUsername(e.target.value)} placeholder="Введите ФИО" type="text" value={username} />
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <h3>Ваш пол*</h3>
                    </div>

                    <div className={styles.RowBox}>
                        {genderList.map((item, i) => (
                            <div key={i} onClick={() => setGender(item)} className={`${styles.Radio} ${item === gender ? styles.Active : ""}`}><div />{item}</div>
                        ))}
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <h3>Ваша дата рождения*</h3>
                        <p>Число. Месяц. Год.</p>
                    </div>

                    <div className={styles.InputBox}>
                        <Input onChange={e => setBday(e.target.value)} placeholder="ДД.ММ.ГГГГ" type="date" value={bday} />
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <h3>Номер телефона для связи*</h3>
                        <p>Номер должен начинаться с "+" и содержать международный код вашей страны</p>
                    </div>

                    <div className={styles.InputBox}>
                        <Input onChange={e => setPhone(e.target.value)} placeholder="+ Х ХХХ ХХХ ХХ ХХ" type="text" value={phone} />
                    </div>
                </div>

                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <h3>Адрес электронной почты*</h3>
                        <p>Всё общение с «Вместе» происходит через письма на почту. Мы пришлём вам письмо с итогом по вашей заявке. Пожалуйста, проверьте правильность адреса несколько раз. </p>
                    </div>

                    <div className={styles.InputBox}>
                        <Input onChange={e => setEmail(e.target.value)} placeholder="Введите e-mail" type="text" value={email} />
                    </div>
                </div>
            </div>

            case 2: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <div className={styles.ColumnBox}>
                            <h3>Каким способом нам лучше связаться с Вами?*</h3>
                            <p>Нам это необходимо знать для нашей системы оплаты и налогообложения</p>
                            <Input onChange={e => setContact(e.target.value)} placeholder="Введите ответ" type="text" value={contact} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Какое у вас гражданство?*</h3>
                            <p>Нам это необходимо знать для нашей системы оплаты и налогообложения</p>
                            <Input onChange={e => setcitizenship(e.target.value)} placeholder="Введите ответ" type="text" value={citizenship} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Ссылки на профили в социальных сетях*</h3>
                            <Textarea onChange={e => setSocialMedia(e.target.value)} placeholder="Введите ответ" value={socailMedia} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Расскажите нам о себе в свободной форме. Что считаете нам нужно узнать о вас, чтобы понять, какой вы специалист?*</h3>
                            <Textarea onChange={e => setBio(e.target.value)} placeholder="Введите ответ" value={bio} />
                        </div>
                    </div>

                    <div className={styles.Column}>
                        <div className={styles.ColumnBox}>
                            <h3>Какое у вас высшее образование?*</h3>
                            <p>Напишите о базовом психологическом (смежном) обучении или переподготовке в формате</p>
                            <h4>{educ.length + 1} образование</h4>
                        </div>

                        <div className={styles.ColumnBox}>
                            <label>Название вуза</label>
                            <Textarea onChange={e => setUniversity(e.target.value)} placeholder="Введите ответ" value={university} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <label>Год окончания</label>
                            <Select array={yearList} setValue={setEndYear} value={endYear === "" ? "Выберите год" : endYear} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <label>Название факультета и специалитета</label>
                            <Textarea onChange={e => setSpecialName(e.target.value)} placeholder="Введите ответ" value={specialName} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <label>Академическая степень</label>
                            <Select array={degreeList} setValue={setDegree} value={degree === "" ? "Выберите вариант" : degree} />
                            {university !== "" && endYear !== "" && specialName !== "" && degree !== "" && <button className={styles.AddButton} onClick={() => addNewEduc()}><Add2Icon /> Добавить</button>}
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Дополнительное образование</h3>
                            <p>Выберите, если у вас есть дополнительное образование, касающееся следующих тем</p>
                            {extraEduList.map((item, i) => (
                                <div className={styles.CheckBox} key={i} onClick={() => checkListHandle(item)}>
                                    <Checkbox state={extraEdu.includes(item)} />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Профессиональное сообщество*</h3>
                            <p>Состоите ли вы в каком-либо психотерапевтическом сообществе. Если да, то в каком?</p>
                            {["Не состою", "Состою"].map((item, i) => (
                                <div key={i} onClick={() => setpromComm(item)} className={`${styles.Radio} ${item === promComm ? styles.Active : ""}`}><div />{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            case 3: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <div className={styles.ColumnBox}>
                            <h3>Ваш основной метод?*</h3>
                            <Select array={mainMethodList} setValue={setmainMethod} value={mainMethod === "" ? "Выберите вариант" : mainMethod} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Ваш дополнительный метод?*</h3>
                            <div className={styles.Grid}>
                                {themeList.map((item, index) => (
                                    <div key={index} className={`${styles.RowItem}`} onClick={() => setEndRegister(false)}>
                                        <div>{items[index].state.length}</div>
                                        <img src={item.image} alt="" />
                                        <h4>{item.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Когда вы начали консультировать?</h3>
                            <p>За деньги, не в рамках учебной программы. Обязательно напишите месяц, не только год.</p>
                            <Input onChange={e => setconsultStart(e.target.value)} placeholder="Введите ответ" type="text" value={consultStart} />
                        </div>
                    </div>

                    <div className={styles.Column}>
                        <div className={styles.ColumnBox}>
                            <h3>Есть ли опыт работы онлайн?*</h3>
                            {["Да", "Нет"].map((item, i) => (
                                <div key={i} onClick={() => setonlineExp(item)} className={`${styles.Radio} ${item === onlineExp ? styles.Active : ""}`}><div />{item}</div>
                            ))}
                            {onlineExp === "Да" && <Input onChange={e => setonlineExpInfo(e.target.value)} placeholder="Укажите время опыта онлайн работы" type="text" value={onlineExpInfo} />}
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Сколько клиентов у вас сейчас в практике?*</h3>
                            <p>Пожалуйста, укажите количество клиентов на текущий момент, а не за всю историю практики.</p>
                            <Input onChange={e => setclients(e.target.value)} placeholder="Введите цифру" type="number" value={clients} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Сколько времени заняла самая длительная терапия среди ваших клиентов?*</h3>
                            <p>Укажите годы, месяцы или число сессий.</p>
                            <Input onChange={e => setlongestSession(e.target.value)} placeholder="Введите ответ" type="text" value={longestSession} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Проходите ли вы личную психотерапию?*</h3>
                            {["Да", "Нет"].map((item, i) => (
                                <div key={i} onClick={() => setpersonalTreopia(item)} className={`${styles.Radio} ${item === personalTreopia ? styles.Active : ""}`}><div />{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            case 4: return <div className={styles.Group}>
                <div className={styles.GroupItem}>
                    <div className={styles.Column}>
                        <div className={styles.ColumnBox}>
                            <h3>Проходите ли вы регулярные супервизии?*</h3>
                            {["Да", "Нет"].map((item, i) => (
                                <div key={i} onClick={() => setsupervisions(item)} className={`${styles.Radio} ${item === supervisions ? styles.Active : ""}`}><div />{item}</div>
                            ))}
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Есть ли другая работа кроме психотерапевтической практики? Как распределяются интересы и приоритеты?*</h3>
                            <Textarea onChange={e => setanotherJob(e.target.value)} placeholder="Введите ответ" value={anotherJob} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Какое количество клиентов вы готовы взять на «Вместе»?*</h3>
                            <p>Пожалуйста, напишите диапазон «от-до»</p>
                            <Input onChange={e => setvmesteClients(e.target.value)} placeholder="Введите ответ" type="text" value={vmesteClients} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Какие вещи вы считаете недопустимыми в психотерапевтическом процессе? Почему?*</h3>
                            <Textarea onChange={e => setpsychProcess(e.target.value)} placeholder="Введите ответ" value={psychProcess} />
                        </div>
                    </div>

                    <div className={styles.Column}>
                        <div className={styles.ColumnBox}>
                            <h3>С чем, по-вашему, нельзя работать онлайн? Почему?*</h3>
                            <Textarea onChange={e => setonlineTherapy(e.target.value)} placeholder="Введите ответ" value={onlineTherapy} />
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Какие консультации готовы вести?</h3>
                            {["Парные", "Индивидуальные", "Любые"].map((item, i) => (
                                <div key={i} onClick={() => setfamilyTherapy(item)} className={`${styles.Radio} ${item === familyTherapy ? styles.Active : ""}`}><div />{item}</div>
                            ))}
                        </div>

                        <div className={styles.ColumnBox}>
                            <h3>Как вы узнали о наборе терапевтов в “Вместе”?*</h3>
                            <Select array={foundUsList} setValue={setfoundUs} value={foundUs === "" ? "Выберите вариант" : foundUs} />
                            {foundUs === "Другое" && <Textarea onChange={e => setonlineTherapy(e.target.value)} placeholder="Введите ответ" value={onlineTherapy} />}
                        </div>
                    </div>
                </div>

                <ButtonDefault disabled={disable} onClick={() => Auth()}>Отправить</ButtonDefault>
                <h6>Нажимая кнопку «Отправить» я подтверждаю, что прочитал(а) и даю <a href="">согласие</a> на обработку своих персональных данных. Подробнее об обработке данных читайте в <a href="">политике</a>.</h6>
            </div>
        }
    }


    useEffect(() => {
        if (step === 1) setDisable(username === "" || gender === "" || bday === "" || phone === "" || email === "")
        if (step === 2) setDisable(contact === "" || citizenship === "" || socailMedia === "" || bio === "" || university === "" && educ.length === 0 || promComm === "")
        // if (step === 3) setDisable([...myCondition, ...relationship, ...work, ...events].length === 0)
        if (step === 3) setDisable(mainMethod === "" || consultStart === "" || onlineExp === "" || clients === "" || longestSession === "" || personalTreopia === "")
        if (step === 4) setDisable(supervisions === "" || anotherJob === "" || vmesteClients === "" || psychProcess === "" || onlineTherapy === "" || familyTherapy === "" || foundUs === "")
    }, [username, gender, bday, phone, email, edu, university, contact, citizenship, socailMedia, bio, educ, step, myCondition, relationship, work, events, promComm, mainMethod, consultStart, onlineExp, clients, longestSession, personalTreopia, supervisions, anotherJob, vmesteClients, psychProcess, onlineTherapy, familyTherapy, foundUs])

    function addNewEduc() {
        setEduc(prev => [...prev, edu])
        clearEduValues()
    }

    function clearEduValues() {
        setUniversity("")
        setEndYear("")
        setSpecialName("")
        setDegree("")
    }

    function checkListHandle(item: string) {
        if (extraEdu.includes(item)) {
            const deleted = extraEdu.filter(i => i !== item)
            setExtraEdu(deleted)
        } else {
            setExtraEdu(prev => [...prev, item])
        }
    }

    const themeList = [
        { title: "Моё состояние", image: "/Register_1.png" },
        { title: "Отношения", image: "/Register_2.png" },
        { title: "Работа, учеба", image: "/Register_3.png" },
        { title: "События в жизни", image: "/Register_4.png" },
    ]

    async function Auth() {
        const data: ICreatePsyh = {
            sid: JSON.parse(localStorage.getItem("sid") as string),
            fio: username,
            promComm: promComm === "Состою",
            extraMethod: "",
            onlineExp: onlineExp === "Да",
            personalTreopia: personalTreopia === "Да",
            supervisions: supervisions === "Да",
            clients: Number(clients),
            docs: "", photos: "",
            familyTherapy: familyTherapy === "Парные",
            gender: gender === "Женский" ? "W" : "M", bday, phone, email, contact, citizenship, socailMedia, bio, educ, mainMethod, consultStart, onlineExpInfo, longestSession,
            anotherJob, vmesteClients, psychProcess, onlineTherapy, foundUs
        }

        const result = await AuthAPI.register(data)
        console.log(result)
        if (result.status === 200) {
            window.location.replace("/")
        } else {
            // alert(result.msg)
            window.location.replace("/")
            localStorage.setItem("userType", "psych")
        }
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = '';
        };
    }, []);

    return (
        <main className={styles.Page}>
            <div className={styles.Box}>
                <StepLine max={4} value={step} />
                {endRegister
                    ? <></>
                    : <>
                        {fillContent()}
                        <div className={styles.Controlls}>
                            {step === 1
                                ? <div></div>
                                : <ButtonRound onClick={() => setStep(step - 1)} disabled={false} big={true}>
                                    <ArrowLeftIcon />
                                </ButtonRound>
                            }

                            {step !== 4 && <ButtonRound onClick={() => step === 4 ? setEndRegister(true) : setStep(step + 1)} disabled={disable} big={true}>
                                <ArrowRightIcon />
                            </ButtonRound>}
                        </div>
                    </>
                }
            </div>

            {/* <MobileBox /> */}
        </main>
    )
}

export default Create