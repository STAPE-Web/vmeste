import { AlertIcon, BatteryIcon, CryIcon, HeardBrokeIcon, PillowIcon, ZapIcon } from "@/ui/Icons"
import styles from "./style.module.css"

const Section3 = () => {
    const items = [
        { icon: AlertIcon, title: "Панические атаки", text: "Вас накрывают необъяснимые приступы тяжелой тревоги, которым сопутствует непреодолимый страх." },
        { icon: ZapIcon, title: "Высокий уровень тревоги", text: "Вы испытываете постоянное напряжение из-за чувства тревоги, даже по незначительным причинам." },
        { icon: BatteryIcon, title: "Хроническая усталость", text: "Вы чувствуете постоянный упадок физических и моральных сил, который не восполняется после сна." },
        { icon: CryIcon, title: "Депрессия", text: "Вы прибываете в угнетенном настроении, которое оказывает влияние на состояние организма." },
        { icon: HeardBrokeIcon, title: "Сложный разрыв отношений", text: "Вы не в силах прийти в себя после развода или мучительного расставания с любимым человеком." },
        { icon: PillowIcon, title: "Нарушение сна", text: "Вы долго мучаетесь бессонницей, а сон не приносит чувства бодрости и кажется поверхностным." },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Если у Вас:</h2>
                <div className={styles.Grid}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.Item}>
                            <div>
                                <item.icon />
                                <h3>{item.title}</h3>
                            </div>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Section3