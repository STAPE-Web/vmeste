import Sidebar from '@/components/Sidebar'
import styles from './style.module.css'
import { ArrowLeftIcon, FullScreenIcon, PauseIcon, RewindLeftIcon, RewindRightIcon, ShareIcon } from '@/ui/Icons'
import Image from "@/assets/Video.png"
import { useNavigate } from 'react-router-dom'

const Video = () => {
    const navigate = useNavigate()

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <div className={styles.Back} onClick={() => navigate(-1)}>
                            <ArrowLeftIcon />
                            Назад
                        </div>

                        <div className={styles.Speed}>
                            <p>Скорость</p>
                            <p>1x</p>
                        </div>
                    </div>

                    <div className={styles.Video}>
                        <img src={Image} alt="" />
                    </div>

                    <div className={styles.Controlls}>
                        <div className={styles.Text}>
                            <div>
                                <h3>Название видео</h3>
                                <p>Описание</p>
                            </div>

                            <h6>4:38 / 11:48</h6>
                        </div>

                        <div className={styles.Timeline}>
                            <div></div>
                        </div>

                        <div className={styles.IconsBox}>
                            <ShareIcon />

                            <div>
                                <RewindLeftIcon />
                                <PauseIcon />
                                <RewindRightIcon />
                            </div>

                            <FullScreenIcon />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Video