import { FC } from 'react'
import styles from './style.module.css'

interface Props {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

const Toggle: FC<Props> = ({ state, setState }) => {
    return (
        <div className={`${styles.Toggle} ${state ? styles.Active : ""}`} onClick={() => setState(!state)}>
            <div></div>
        </div>
    )
}

export default Toggle