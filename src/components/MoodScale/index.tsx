import styles from "./style.module.css"

const MoodScale = () => {
    const values = [
        { color: "#FF8702", value: 20 },
        { color: "#F8CB2F", value: 13 },
        { color: "#FB5935", value: 13 },
        { color: "#92D35E", value: 20 },
        { color: "#40BF7B", value: 14 },
        { color: "#15A8B1", value: 20 },
    ]

    return (
        <div className={styles.MoodScale}>
            <div className={styles.Range}>{values.map((item, index) => (<div key={index} style={{ background: item.color, width: `${item.value}%` }}></div>))}</div>

            <div className={styles.Values}>
                {values.map((item, index) => (<div key={index} className={styles.ValuesItems}>
                    <div style={{ background: item.color }}></div>
                    <p>{item.value}%</p>
                </div>))}
            </div>
        </div>
    )
}

export default MoodScale