import { FC } from 'react'
import styles from './style.module.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Props {
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
    array: string[]
}

const Range: FC<Props> = ({ value, setValue, array }) => {
    return (
        <div className={styles.Range}>
            <div className={styles.Steps}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}></div>
                ))}
            </div>

            <div className={styles.RangeBox}>
                <Slider range value={value} step={10} onChange={value => setValue(Number(value))} />
                <div className={styles.FillTrack} style={{ width: Number(value) + '%' }}></div>
            </div>

            <div className={styles.Steps}>
                {array.map((arr, index) => (
                    <p key={index}>{arr}</p>
                ))}
            </div>
        </div>
    )
}

export default Range