import styles from "./style.module.css"

const Section2 = () => {
    const items = [
        { title: "20 лет", text: "работаем в психологии с\nразными категориями состояний" },
        { title: "93%", text: "обратившихся, находят своего\nпсихолога с первого раза" },
        { title: "10 000+", text: "человек получили поддержку\nс психологами ВМЕСТЕ" },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                {items.map((item, index) => (
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Section2