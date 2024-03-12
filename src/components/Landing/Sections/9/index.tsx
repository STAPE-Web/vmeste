import styles from "./style.module.css"

const Section9 = () => {
    const items = [
        { title: "Экономим Ваше время", name: "Занимайтесь, где и когда вам удобно. Перенести или отменить сессию можно в личном кабинете в два клика." },
        { title: "Помогаем найти именно «вашего» специалиста", name: "Если психолог не подойдёт по любым причинам, мы предложим другого." },
        { title: "Заботимся о результате", name: "Напоминаем о сессиях, регулярно собираем отзывы и приходим на помощь, если что-то идёт не так." },
        { title: "Удобная оплата", name: "Деньги за сессию списываются после встречи. Если консультация не состоится, деньги вернутся на вашу карту." },
        { title: "Рекомендуем специалистов, в которых уверены", name: "Вам не нужно беспокоиться о квалификации специалиста. Мы всё проверили. Каждый специалист решает тест на этику и проходит собеседование. Просим подтверждение, что специалист работает дольше 3 лет, проходит личную терапию и регулярные супервизии." },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <h2>Сервис ВМЕСТЕ позаботится обо всем:</h2>
                <div className={styles.List}>
                    <div className={styles.Items}>
                        {items.filter((_, id) => id < 3).map((item, index) => (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.Items2}>
                        {items.filter((_, id) => id > 2).map((item, index) => (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section9