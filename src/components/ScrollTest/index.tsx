import ButtonRound from "@/ui/Buttons/Round"
import styles from "./style.module.css"
import { FC } from "react"
import { ArrowLeftIcon, ArrowRightIcon, Like2Icon, LikeIcon } from "@/ui/Icons"
import { useNavigate } from "react-router-dom"
import { ITests } from "@/types"
import { MaterialsAPI } from "@/api"

interface Props {
    array: ITests[]
    title: string
    getMaterials: () => Promise<void>
}

const ScrollTest: FC<Props> = ({ array, title, getMaterials }) => {
    const navigate = useNavigate()
    const sid = JSON.parse(localStorage.getItem("sid") as string)

    async function addToFavorite(id: string) {
        const result = await MaterialsAPI.like(sid, "add", "tests", id)
        console.log(result)
        await getMaterials()
    }

    async function removeToFavorite(id: string) {
        const result = await MaterialsAPI.like(sid, "delete", "tests", id)
        console.log(result)
        await getMaterials()
    }

    return (
        <div className={styles.Box}>
            <h3>{title}</h3>
            <div className={styles.ScrollBox}>
                {array.length >= 5 && <div className={styles.PrevButton}>
                    <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowLeftIcon /></ButtonRound>
                </div>}

                <div className={styles.Scroll}>
                    {array.map((item, index) => (
                        <div key={index} className={styles.Item} onClick={() => navigate(`/test/${item.id}`)}>
                            <div>
                                {item.isFavorite
                                    ? <Like2Icon className={styles.LikeIcon} onClick={(e: any) => {
                                        e.stopPropagation();
                                        removeToFavorite(item.id)
                                    }} />
                                    : <LikeIcon className={styles.LikeIcon} onClick={(e: any) => {
                                        e.stopPropagation();
                                        addToFavorite(item.id)
                                    }} />
                                }
                            </div>
                            <h2>{item.name}</h2>
                            <p>{item.countTime} минут на прохождение</p>
                        </div>
                    ))}
                </div>

                {array.length >= 5 && <div className={styles.NextButton}>
                    <ButtonRound big={true} disabled={true} onClick={() => ({})}><ArrowRightIcon /></ButtonRound>
                </div>}
            </div>
        </div>
    )
}

export default ScrollTest