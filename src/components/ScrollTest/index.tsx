import ButtonRound from "@/ui/Buttons/Round"
import styles from "./style.module.css"
import { FC } from "react"
import { ArrowLeftIcon, ArrowRightIcon, LikeIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"

type IArray = {
    title: string
    time: string
}

interface Props {
    array: IArray[]
    title: string
}

const ScrollTest: FC<Props> = ({ array, title }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.Box}>
            <h3>{title}</h3>
            <div className={styles.ScrollBox}>
                <div className={styles.PrevButton}>
                    <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowLeftIcon /></ButtonRound>
                </div>

                <div className={styles.Scroll}>
                    {array.map((item, index) => (
                        <div key={index} className={styles.Item} onClick={() => navigate("/test")}>
                            <div>
                                <LikeIcon className={styles.LikeIcon} />
                            </div>
                            <h2>{item.title}</h2>
                            <p>{item.time}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.NextButton}>
                    <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowRightIcon /></ButtonRound>
                </div>
            </div>
        </div>
    )
}

export default ScrollTest