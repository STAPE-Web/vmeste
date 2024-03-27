import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    data: { name: string, value: number }[]
}

const MoodScale: FC<Props> = ({ data }) => {
    function feelColor(name: string) {
        switch (name) {
            case "Радость": return "#FF8702";
            case "Страх": return "#F8CB2F";
            case "Бешенство": return "#FB5935";
            case "Грусть": return "#92D35E";
            case "Спокойствие": return "#40BF7B";
            case "Сила": return "#15A8B1";
        }
    }

    // const values = [
    //     { color: "#FF8702", value: 20 },
    //     { color: "#F8CB2F", value: 13 },
    //     { color: "#FB5935", value: 13 },
    //     { color: "#92D35E", value: 20 },
    //     { color: "#40BF7B", value: 14 },
    //     { color: "#15A8B1", value: 20 },
    // ]

    return (
        <div className={styles.MoodScale}>
            <div className={styles.Range}>{data.map((item, index) => (<div key={index} style={{ background: feelColor(item.name), width: `${item.value}%` }}></div>))}</div>

            <div className={styles.Values}>
                {data.map((item, index) => (<div key={index} className={styles.ValuesItems}>
                    <div style={{ background: feelColor(item.name) }}></div>
                    <p>{item.value}%</p>
                </div>))}
            </div>
        </div>
    )
}

export default MoodScale