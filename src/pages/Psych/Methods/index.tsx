import PsychSidebar from "@/components/PsyhSidebar"
import styles from "./style.module.css"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"

const Methods = () => {
    const methodList = ["Психоаналитическая терапия", "Транзактный анализ", "Системный семейный подход", "Гештальт-терапия", "Экзистенциальная психотерапия", "Понимающая психотерапия / клиент-центрированный подход", "КПТ", "Позитивная психотерапия", "Юнгианский анализ", "Психодрама", "Телесно-ориентированная терапия", "Символдрама"]
    const typeList = ["Индивидуальная", "Парная"]

    return (
        <main className={styles.Page}>
            <PsychSidebar />

            <section className={styles.Section}>
                <label>Методы терапии</label>
                <p>Выберите 1-2 метода, в которых вы работаете онлайн</p>
                {methodList.map((item, index) => (
                    <div key={index}>
                        <Checkbox state={false} />
                        {item}
                    </div>
                ))}


                <label className={styles.Margin}>Вид терапии</label>
                {typeList.map((item, index) => (
                    <div key={index}>
                        <Checkbox state={false} />
                        {item}
                    </div>
                ))}

                <ButtonDefault disabled={false} onClick={() => ({})}>Сохранить</ButtonDefault>
            </section>
        </main>
    )
}

export default Methods