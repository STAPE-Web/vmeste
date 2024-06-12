import Footer from "@/components/Landing/Footer"
import styles from "./style.module.css"
import LandingHeader from "@/components/Landing/Header"
import { useNavigate } from "react-router-dom"
import { CareIcon, LikeIcon, MindIcon } from "@/ui/Icons"
import ButtonDefault from "@/ui/Buttons/Default"
import Illustration2 from "@/assets/Illustration2"
import Illustration3 from "@/assets/Illustration3"

const About = () => {
    const navigate = useNavigate()
    const isAuth = JSON.parse(localStorage.getItem('isAuth') as string)
    const items = [
        { name: "поддержка", icon: LikeIcon },
        { name: "забота", icon: CareIcon },
        { name: "понимание", icon: MindIcon },
    ]

    return (
        <>
            <LandingHeader />

            <main className={styles.Page}>
                <section className={styles.Section1}>
                    <div className={styles.Container}>
                        <div className={styles.Box}>
                            <div className={styles.Items}>
                                {items.map((item, index) => (
                                    <div key={index}>
                                        <item.icon />
                                        {item.name}
                                    </div>
                                ))}
                            </div>

                            <h1><span>Как все</span> начиналось</h1>
                            <h3>История о там, как помощь людям переросла <br /> в нечто большее.</h3>

                            <div className={styles.Price}>10 000+ человек <br /> получили поддержку</div>

                            <ButtonDefault disabled={false} onClick={() => isAuth ? navigate("/specialists") : navigate("/auth")}>Выбрать психолога</ButtonDefault>
                        </div>

                        <Illustration2 className={styles.Illustration} />
                    </div>
                </section>

                <section className={styles.Section2}>
                    <p>Около 20 лет назад несколько психологов и священников объединились в оказании помощи своим близким, которые погрязали в употреблении наркотиков. На тот момент это была неизученная тема, не было квалифицируемой помощи таким людям и приходилось все знания добывать по крупицам.   Прорабатывалась  литература, поднимался опыт коллег, получались образования за границей. Появились первые успехи. </p>

                    <div className={styles.Box}>«Потянулись со всех регионов зависимые и их родственники. Началась работа с ними...»</div>

                    <p>Потом на поверхность вышла новая проблематика. Выпускники и их родители на момент устойчивой ремиссии  первых оказывались людьми социально опустошенными. Не было жилья, работы, отношений, но начинать строить свою новую жизнь через старые установки нечестностей, воровства и обмана они не хотели. Чтобы помочь им отстроить жизнь с чистого листа, специалисты стала углубляться в смежные направления: целеполагание, саморазвитие, искусство построения конструктивных отношений, здоровья - и все это на основе духовности. Без нее все разваливалось. </p>

                    <Illustration3 className={styles.Image} />

                    <p>В какой-то момент обращений за помощью стало очень много, люди буквально с разных сторон света просили о помощи, причём это уже давно были не связанные с алкоголем и наркотиками клиенты. Им очень импонировал разносторонний подход команды. Было принято решение перейти работать в онлайн, что дало возможность многим желающим уникальным специалистам из других регионов влиться в команду.</p>

                    <div className={styles.Box}>
                        «За 20 лет центр стал магнитом притяжения профессионалов...»
                        <ButtonDefault disabled={false} onClick={() => isAuth ? navigate("/specialists") : navigate("/auth")}>Выбрать психолога</ButtonDefault>
                    </div>

                    <p>При всей популярности программ, семинаров и марафонов у многих людей остаётся большая потребность в личных беседах и консультациях. Поэтому для  вашего удобства мы собрали наших специалистов в одном сервисе. Все примкнувшие к нашей команде профессионалы прошли конкурсные собеседования, спецтесты и, конечно же, имеют академические образования в сфере психологии. Мы с радостью и гордостью их рекомендуем.</p>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default About