import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Psyholog from "@/assets/Psyholog.png"
import Avatar from "@/assets/Avatar.png"
import Avatar2 from "@/assets/Avatar2.png"
import Avatar3 from "@/assets/Avatar3.png"
import Avatar4 from "@/assets/Avatar4.png"
import Avatar5 from "@/assets/Avatar5.png"
import Avatar6 from "@/assets/Avatar6.png"
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, FilterIcon, LikeIcon, ThemesIcon, VerifedIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import ButtonRound from "@/ui/Buttons/Round"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Specialists = () => {
    const navigate = useNavigate()
    const [fullText, setFullText] = useState(false)
    const [education, setEducation] = useState(false)
    const [methods, setMethods] = useState(false)
    const list = [Avatar, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar4, Avatar5, Avatar6]
    const achive = [
        { title: "Опыт", value: "5 лет", icon: VerifedIcon },
        { title: "Темы", value: "4/4", icon: ThemesIcon },
    ]

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <h2 className={styles.Title}>Выбор специалиста</h2>

                    <div className={styles.SpecialistsBox}>
                        <div className={styles.Avatars}>
                            {list.map((item, index) => (
                                <img src={item} key={index} alt="" />
                            ))}
                        </div>

                        <FilterIcon onClick={() => navigate("/filter")} />
                    </div>

                    <div className={styles.InfoBox}>
                        <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowLeftIcon /></ButtonRound>

                        <div className={styles.ImageBox}>
                            <img src={Psyholog} alt="" />
                            <LikeIcon />
                        </div>

                        <div className={styles.Info}>
                            <h3>Констанин Никольский</h3>
                            <div>
                                <h4>Индивидуальная сессия 50 мин, 2 500 ₽</h4>
                                <h4>Запись <span>с 25 декабря, 16:00</span></h4>
                            </div>

                            <div className={styles.Achive}>
                                {achive.map((item, idnex) => (
                                    <div key={idnex} className={styles.AchiveItem}>
                                        <item.icon />
                                        <div>
                                            <h4>{item.title}</h4>
                                            <p>{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.About}>
                                <h2>О себе</h2>
                                <p className={fullText ? styles.FullText : ""}>Оказываю психологическую помощь и даю профессиональную поддержку людям, оказавшимся в сложной жизненной ситуации. Помогаю разрешить внутренниеОказываю психологическую помощь и даю профессиональную поддержку людям, оказавшимся в сложной жизненной ситуации. Помогаю разрешить внутренние Оказываю психологическую помощь и даю профессиональную поддержку людям, оказавшимся в сложной жизненной ситуации. Помогаю разрешить внутренниеОказываю психологическую помощь и даю профессиональную поддержку людям, оказавшимся в сложной жизненной ситуации. Помогаю разрешить внутренние</p>
                                <h5 onClick={() => setFullText(!fullText)}>{fullText ? "Свернуть" : "Читать полностью"}</h5>
                            </div>
                        </div>

                        <ButtonRound big={true} disabled={false} onClick={() => ({})}><ArrowRightIcon /></ButtonRound>
                    </div>

                    <div className={`${styles.TextBox} ${education ? styles.ActiveTextBox : ""}`} onClick={() => setEducation(!education)}>
                        <div className={styles.TextBoxTop}>
                            <div>
                                <h2>Образование</h2>
                                <p>4 подтвержденные записи</p>
                            </div>

                            <ArrowDownIcon />
                        </div>

                        <div className={styles.TextBoxBottom}>
                            <div>
                                <h5>2022</h5>
                                <p>Московский Гештальт Институт. Специализация "Зависимость и зависимые отношения. Гештальт-подход".</p>
                            </div>

                            <div>
                                <h5>2021</h5>
                                <p>Московский Гештальт Институт. Теория и практика гештальт-терапии.</p>
                            </div>

                            <div>
                                <h5>2019</h5>
                                <p>Московский Гештальт Институт. Специализация "Гештальт-подход в работе с травматическими переживаниями".</p>
                            </div>

                            <div>
                                <h5>2016</h5>
                                <p>Белорусский государственный педагогический университет имени М. Танка. Социальная педагогика с дополнительной специальностью "Практическая психология".</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.TextBox} ${methods ? styles.ActiveTextBox : ""}`} onClick={() => setMethods(!methods)}>
                        <div className={styles.TextBoxTop}>
                            <div>
                                <h2>Методы терапии</h2>
                                <p>Гештальт-терапия</p>
                            </div>

                            <ArrowDownIcon />
                        </div>

                        <div className={styles.TextBoxBottom}>
                            <p>Ключевое понятие гештальт-терапии — целостность, полнота жизни. Достичь этой целостности мешают ситуации, которые человек проживает не до конца: проглатывает обиду, подавляет гнев, отвергает потребности и тд. Задача гештальт-терапевта — помочь человеку соединиться с эмоциями и осознать опыт во всей полноте. В ходе терапии клиент развивает самонаблюдение и начинает лучше осознавать сценарии поведения, устанавливает контакт с собой, с собственным телом и перестаёт испытывать напряжение от тревожащих его ситуаций.</p>
                        </div>
                    </div>

                    <div className={styles.ButtonBox}>
                        <ButtonDefault disabled={false} onClick={() => ({})}>Выбрать время сессии</ButtonDefault>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Specialists