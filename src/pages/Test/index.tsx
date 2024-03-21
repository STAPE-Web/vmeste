import { ArrowLeftIcon, CheckIcon, CloseIcon } from '@/ui/Icons'
import styles from './style.module.css'
import ButtonDefault from '@/ui/Buttons/Default'
import { useCallback, useEffect, useState } from 'react'
import StepLine from '@/ui/StepLine'
import { useNavigate, useParams } from 'react-router-dom'
import { TestsAPI } from '@/api'
import { IQuestion, ITests } from '@/types'

type ITestResult = {
    text: string
    recomendations: string
}

const Test = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<ITests | null>(null)
    const { id } = useParams()
    const sid = JSON.parse(localStorage.getItem("sid") as string)
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<number>(0)
    const [answersList, setAnswersList] = useState<number[]>([])
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [testResult, setTestResult] = useState<ITestResult | null>(null)

    const getTest = useCallback(async () => {
        const result = await TestsAPI.getAll(sid)
        const testData: ITests[] = result.res
        const filterData: ITests = testData.filter(i => i.id === id)[0]
        setData(filterData)
        setQuestions(filterData.questions)
    }, [sid])

    useEffect(() => {
        getTest()
    }, [getTest])

    async function getResult() {
        if (id !== undefined) {
            const result = await TestsAPI.getResult(sid, id, answersList)
            setTestResult(result.result)
        }
    }

    useEffect(() => {
        if (step === 666) {
            getResult()
        }
    }, [step])

    if (data === null) return;

    function fillContent() {
        switch (step) {
            case 0: return <>
                <div className={styles.Top}>
                    <p>3 минуты на прохождение</p>
                    <CloseIcon onClick={() => navigate(-1)} />
                </div>

                <div className={styles.Box}>
                    <h2>{data?.name}</h2>
                    <p>{data?.extendedDescription}</p>
                    <ButtonDefault disabled={false} onClick={() => setStep(1)}>Начать тест</ButtonDefault>
                </div>
            </>

            case step > 0 && step < questions.length + 1 ? step : 1: return <>
                <div className={styles.Box}>
                    <div className={styles.ButtonGrid}>
                        {questions[step - 1].options.map((item, index) => (
                            <div className={`${styles.CheckButton} ${item.point === answers ? styles.Active : ""}`} key={index} onClick={() => {
                                setAnswers(item.point)
                            }}>
                                {item.option}
                                <div><CheckIcon /></div>
                            </div>
                        ))}
                    </div>

                    <ButtonDefault disabled={answers === undefined} onClick={() => {
                        if (answers !== undefined) {
                            setStep(step < questions.length ? step + 1 : 666)
                            setAnswersList(prev => [...prev, answers])
                            setAnswers(0)
                        }
                    }}>Далее</ButtonDefault>
                </div>
            </>

            case 666: return <>
                <div className={styles.Top}>
                    <p>Ваш результат</p>
                    <CloseIcon onClick={() => navigate("/")} />
                </div>

                <div className={styles.Box}>
                    <h2>{testResult?.text}</h2>
                    <p>{testResult?.recomendations}</p>
                </div>
            </>
        }
    }

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                {step !== 0 && step !== 666 && <div className={styles.Controlls}>
                    <div className={styles.Group}>
                        <div onClick={() => setStep(step - 1)} className={styles.Back}><ArrowLeftIcon /> Назад</div>
                        <p>{step}/{questions.length}</p>
                        <div className={styles.Close}>
                            <CloseIcon onClick={() => navigate("/")} />
                        </div>
                    </div>

                    <StepLine max={questions.length} value={step} />

                    <h3>{questions[step - 1].question}</h3>
                </div>}

                {fillContent()}
            </section>
        </main>
    )
}

export default Test