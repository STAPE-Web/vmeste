import { ArrowLeftIcon, LikeIcon } from '@/ui/Icons'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import Telegram from '@/assets/Share/Telegram'
import CopyLink from '@/assets/Share/CopyLink'
import WhatsApp from '@/assets/Share/WhatsApp'
import Mail from '@/assets/Share/Mail'
import Message from '@/assets/Share/Message'
import More from '@/assets/Share/More'

const Article = () => {
    const navigate = useNavigate()
    const shareList = [
        { icon: Telegram, name: "Telegram" },
        { icon: CopyLink, name: "Коп. ссылку" },
        { icon: WhatsApp, name: "WhatsApp" },
        { icon: Mail, name: "Почта" },
        { icon: Message, name: "Сообщения" },
        { icon: More, name: "Ещё" },
    ]

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <div className={styles.Controlls}>
                    <div onClick={() => navigate(-1)} className={styles.Back}><ArrowLeftIcon /> Назад</div>
                </div>

                <div className={styles.Box}>
                    <div className={styles.Row}>
                        <div className={styles.Category}>Отношения</div>
                        <LikeIcon className={styles.Like} />
                    </div>

                    <h2>Как распознать ядовитые отношения? Восемь признаков токсичности</h2>

                    <div className={styles.Autor}>
                        <img src="" alt="" />
                        <p>Анна Дегтярёва · 30 дек. 2023 </p>
                    </div>

                    <p>Каждому из нас знакомо ощущение, когда взаимоотношения начинают постепенно поглощать и подтачивать наше эмоциональное и психическое благополучие. Мы оказываемся в ловушке в ядовитых отношениях, где токсичность проникает в каждый аспект нашей жизни, и с каждым днем становится все сложнее осознать, что мы находимся в этом воронье.
                        Проблема заключается в том, что ядовитые отношения могут быть маскированы под покровом любви, заботы или привычки. Мы можем быть привыкли к такому образу взаимодействия, что не замечаем опасности нашего подсознания. Отсутствие здоровых границ и навязчивые поведения все больше влияют на наше самоуважение и самооценку. </p>

                    <div className={styles.Share}>
                        <h3>Поделиться</h3>
                        <div className={styles.ShareList}>
                            {shareList.map((item, index) => (
                                <div key={index}>
                                    <item.icon />
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Article