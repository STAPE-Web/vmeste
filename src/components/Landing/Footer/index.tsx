import Logo2 from "@/assets/Logo2"
import ButtonRound from "@/ui/Buttons/Round"
import { DzenIcon, TelegramIcon, VKIcon, YouTubeIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import Image1 from "@/assets/AppStore2.png"
import Image2 from "@/assets/GooglePlay2.png"
import Image3 from "@/assets/Qrcode.png"

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.Container}>
                <div className={styles.Box}>
                    <Logo2 />

                    <div>
                        <h3>+7 999 999 99 99</h3>
                        <p>По всем вопросам</p>
                    </div>

                    <div>
                        <h3>info@vmeste.com</h3>
                        <p>Напишите нам</p>
                    </div>

                    <h4>© 2024 Вместе</h4>
                </div>

                <ul>
                    <li>Главная</li>
                    <li>Личный кабинет</li>
                    <li>Для психологов</li>
                    <li>О нас</li>
                    <li>Блог</li>
                </ul>

                <div className={styles.Download}>
                    <p>Скачать приложение</p>

                    <div className={styles.Images}>
                        <div>
                            <img src={Image1} alt="" />
                            <img src={Image2} alt="" />
                        </div>

                        <img src={Image3} alt="" />
                    </div>
                </div>

                <div className={styles.SocialBox}>
                    <div className={styles.Language}>
                        <p>RU</p>
                        <p>|</p>
                        <p>EN</p>
                    </div>

                    <h4>Мы в социальных сетях</h4>

                    <div className={styles.SocButBox}>
                        <ButtonRound big={true} disabled={false} onClick={() => ({})}><YouTubeIcon /></ButtonRound>
                        <ButtonRound big={true} disabled={false} onClick={() => ({})}><TelegramIcon /></ButtonRound>
                        <ButtonRound big={true} disabled={false} onClick={() => ({})}><DzenIcon /></ButtonRound>
                        <ButtonRound big={true} disabled={false} onClick={() => ({})}><VKIcon /></ButtonRound>
                    </div>

                    <div className={styles.LinkBox}>
                        <h6>Пользовательское соглашение</h6>
                        <h6>Обработка персональных данных</h6>
                        <h6>Согласие на обработку</h6>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer