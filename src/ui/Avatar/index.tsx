import { FC } from "react"
import styles from "./style.module.css"

interface Props {
  url: string
  name: string
}

const Avatar: FC<Props> = ({ url, name }) => {
  return (
    <div className={styles.Avatar}>
      {url !== ""
        ? <img src={url} alt="" />
        : <p>{name}</p>
      }
    </div>
  )
}

export default Avatar