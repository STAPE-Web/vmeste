import Sidebar from "@/components/Sidebar"
import styles from "./style.module.css"
import Psyholog from "@/assets/Psyholog.png"
import Avatar from "@/assets/Avatar.png"
import Avatar2 from "@/assets/Avatar2.png"
import Avatar3 from "@/assets/Avatar3.png"
import Avatar4 from "@/assets/Avatar4.png"
import Avatar5 from "@/assets/Avatar5.png"
import Avatar6 from "@/assets/Avatar6.png"
import { ArrowDownIcon, FilterIcon, LikeIcon, ThemesIcon, VerifedIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"

const Specialists = () => {
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
                    <h2>Выбор специалиста</h2>

                    <div className={styles.SpecialistsBox}>
                        <div className={styles.Avatars}>
                            {list.map((item, index) => (
                                <img src={item} key={index} alt="" />
                            ))}
                        </div>

                        <FilterIcon />
                    </div>

                    <div className={styles.InfoBox}>
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
                                <p>Оказываю психологическую помощь и даю профессиональную поддержку людям, оказавшимся в сложной жизненной ситуации. Помогаю разрешить внутренниеОказываю психологическую помощь и даю профессиональную поддержку людям, оказавшимся в сложной жизненной ситуации. Помогаю разрешить внутренние</p>
                                <h5>Читать полностью</h5>
                            </div>
                        </div>
                    </div>

                    <div className={styles.TextBox}>
                        <div>
                            <h2>Образование</h2>
                            <p>4 подтвержденные записи</p>
                        </div>

                        <ArrowDownIcon />
                    </div>

                    <div className={styles.TextBox}>
                        <div>
                            <h2>Методы терапии</h2>
                            <p>Гештальт-терапия</p>
                        </div>

                        <ArrowDownIcon />
                    </div>

                    <div>
                        <ButtonDefault disabled={false} onClick={() => ({})}>Выбрать время сессии</ButtonDefault>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Specialists