import styles from "./style.module.css"
import Image from "@/assets/Landing2.png"

const Section10 = () => {
    const items = [
        { icon: Icon1, text: "В удобное для Вас время и в комфортном месте" },
        { icon: Icon2, text: "В мессенджерах, видеозвонках или аудиозвонках" },
        { icon: Icon3, text: "Безопасно и конфиденциально, анонимно подбирая психолога" },
    ]

    return (
        <section className={styles.Section}>
            <div className={styles.Container}>
                <div className={styles.Box}>
                    <h2>Общайтесь с психологом <br /> в удобном формате!</h2>
                    <div className={styles.BoxItem}>
                        {items.map((item, index) => (
                            <div key={index}>
                                <item.icon />
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>

                <img src={Image} className={styles.Image} alt="" />
            </div>
        </section>
    )
}

export default Section10

const Icon1 = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="57"
            fill="none"
            viewBox="0 0 56 57"
            {...props}
        >
            <path
                fill="#FF8702"
                d="M25.806 2.351a3 3 0 014.388 0l.674.723a3 3 0 003.494.656l.869-.418a3 3 0 014.082 1.58l.397.983a3 3 0 003.001 1.868l.997-.073a3 3 0 013.219 2.932l.023 1.14a3 3 0 002.105 2.803l1.026.32a3 3 0 011.93 3.874l-.4 1.118a3 3 0 00.949 3.351l.898.72a3 3 0 01.399 4.297l-.768.892a3 3 0 00-.319 3.463l.598 1.029a3 3 0 01-1.183 4.154l-.985.525a3 3 0 00-1.55 3.13l.189 1.154a3 3 0 01-2.618 3.463l-1.027.119a3 3 0 00-2.596 2.379l-.22 1.078a3 3 0 01-3.714 2.298l-.942-.252a3 3 0 00-3.305 1.288l-.548.86a3 3 0 01-4.31.805l-.78-.575a3 3 0 00-3.558 0l-.78.575a3 3 0 01-4.31-.805l-.548-.86a3 3 0 00-3.305-1.288l-.942.252a3 3 0 01-3.714-2.297l-.22-1.08a3 3 0 00-2.596-2.378l-1.027-.119a3 3 0 01-2.618-3.463l.189-1.154a3 3 0 00-1.55-3.13l-.985-.525a3 3 0 01-1.183-4.154l.598-1.029a3 3 0 00-.32-3.463l-.767-.892a3 3 0 01.399-4.297l.898-.72a3 3 0 00.948-3.351l-.4-1.118a3 3 0 011.931-3.874l1.026-.32A3 3 0 009.05 11.74l.023-1.139a3 3 0 013.22-2.932l.996.073a3 3 0 003.001-1.868l.397-.983a3 3 0 014.082-1.58l.869.418a3 3 0 003.494-.656l.674-.723z"
            ></path>
            <path
                fill="#fff"
                d="M28 26.716a.722.722 0 00-.722.722v.84h-.934a.722.722 0 100 1.444h.934v5.937a.722.722 0 101.444 0v-5.937h5.843a.722.722 0 100-1.444h-5.843v-.84a.722.722 0 00-.722-.722z"
            ></path>
            <path
                fill="#fff"
                d="M28 18.167a10.877 10.877 0 00-7.964 3.499.722.722 0 00-1.404.19l-.116 2.003.002.02a.7.7 0 00.003.078c.002.022.003.045.007.067.004.021.01.043.016.064a.679.679 0 00.024.076l.005.019c.01.022.022.043.033.063l.014.028c.023.036.048.07.075.102l.017.017a.711.711 0 00.17.134l.014.01.017.008.014.007.023.01a.72.72 0 00.744-.07l1.673-.713a.718.718 0 00-.065-1.35A9.422 9.422 0 0128 19.611c5.177 0 9.389 4.212 9.389 9.39 0 5.176-4.212 9.388-9.389 9.388S18.611 34.177 18.611 29a.722.722 0 10-1.444 0c0 5.974 4.86 10.833 10.833 10.833 5.974 0 10.833-4.86 10.833-10.833S33.973 18.167 28 18.167z"
            ></path>
        </svg>
    )
}

const Icon2 = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="57"
            fill="none"
            viewBox="0 0 56 57"
            {...props}
        >
            <path
                fill="#FF8702"
                d="M25.806 2.351a3 3 0 014.388 0l.674.723a3 3 0 003.494.656l.869-.418a3 3 0 014.082 1.58l.397.983a3 3 0 003.001 1.868l.997-.073a3 3 0 013.219 2.932l.023 1.14a3 3 0 002.105 2.803l1.026.32a3 3 0 011.93 3.874l-.4 1.118a3 3 0 00.949 3.351l.898.72a3 3 0 01.399 4.297l-.768.892a3 3 0 00-.319 3.463l.598 1.029a3 3 0 01-1.183 4.154l-.985.525a3 3 0 00-1.55 3.13l.189 1.154a3 3 0 01-2.618 3.463l-1.027.119a3 3 0 00-2.596 2.379l-.22 1.078a3 3 0 01-3.714 2.298l-.942-.252a3 3 0 00-3.305 1.288l-.548.86a3 3 0 01-4.31.805l-.78-.575a3 3 0 00-3.558 0l-.78.575a3 3 0 01-4.31-.805l-.548-.86a3 3 0 00-3.305-1.288l-.942.252a3 3 0 01-3.714-2.297l-.22-1.08a3 3 0 00-2.596-2.378l-1.027-.119a3 3 0 01-2.618-3.463l.189-1.154a3 3 0 00-1.55-3.13l-.985-.525a3 3 0 01-1.183-4.154l.598-1.029a3 3 0 00-.32-3.463l-.767-.892a3 3 0 01.399-4.297l.898-.72a3 3 0 00.948-3.351l-.4-1.118a3 3 0 011.931-3.874l1.026-.32A3 3 0 009.05 11.74l.023-1.139a3 3 0 013.22-2.932l.996.073a3 3 0 003.001-1.868l.397-.983a3 3 0 014.082-1.58l.869.418a3 3 0 003.494-.656l.674-.723z"
            ></path>
            <path fill="#fff" d="M32.675 33.088v0z"></path>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M36.66 35.38l-4.185-2.863v.57a4.66 4.66 0 01-4.655 4.656h-7.964a4.66 4.66 0 01-4.655-4.655v-8.233a4.66 4.66 0 014.655-4.655h7.964a4.66 4.66 0 014.655 4.655v.672l4.14-2.96a2.638 2.638 0 012.75-.201 2.635 2.635 0 011.436 2.353v8.476a2.64 2.64 0 01-1.412 2.341 2.644 2.644 0 01-2.73-.156zm-4.185-4.732l5.055 3.46c.497.339.968.155 1.14.064.172-.09.589-.375.589-.977V24.72c0-.61-.426-.892-.6-.982a1.083 1.083 0 00-1.148.084l-5.036 3.602v3.226zm-15.732-5.793v8.233a3.116 3.116 0 003.113 3.113h7.964a3.116 3.116 0 003.113-3.113v-8.233a3.116 3.116 0 00-3.113-3.113h-7.964a3.116 3.116 0 00-3.113 3.113z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

const Icon3 = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="57"
            fill="none"
            viewBox="0 0 56 57"
            {...props}
        >
            <path
                fill="#FF8702"
                d="M25.806 2.351a3 3 0 014.388 0l.674.723a3 3 0 003.494.656l.869-.418a3 3 0 014.082 1.58l.397.983a3 3 0 003.001 1.868l.997-.073a3 3 0 013.219 2.932l.023 1.14a3 3 0 002.105 2.803l1.026.32a3 3 0 011.93 3.874l-.4 1.118a3 3 0 00.949 3.351l.898.72a3 3 0 01.399 4.297l-.768.892a3 3 0 00-.319 3.463l.598 1.029a3 3 0 01-1.183 4.154l-.985.525a3 3 0 00-1.55 3.13l.189 1.154a3 3 0 01-2.618 3.463l-1.027.119a3 3 0 00-2.596 2.379l-.22 1.078a3 3 0 01-3.714 2.298l-.942-.252a3 3 0 00-3.305 1.288l-.548.86a3 3 0 01-4.31.805l-.78-.575a3 3 0 00-3.558 0l-.78.575a3 3 0 01-4.31-.805l-.548-.86a3 3 0 00-3.305-1.288l-.942.252a3 3 0 01-3.714-2.297l-.22-1.08a3 3 0 00-2.596-2.378l-1.027-.119a3 3 0 01-2.618-3.463l.189-1.154a3 3 0 00-1.55-3.13l-.985-.525a3 3 0 01-1.183-4.154l.598-1.029a3 3 0 00-.32-3.463l-.767-.892a3 3 0 01.399-4.297l.898-.72a3 3 0 00.948-3.351l-.4-1.118a3 3 0 011.931-3.874l1.026-.32A3 3 0 009.05 11.74l.023-1.139a3 3 0 013.22-2.932l.996.073a3 3 0 003.001-1.868l.397-.983a3 3 0 014.082-1.58l.869.418a3 3 0 003.494-.656l.674-.723z"
            ></path>
            <g fill="#fff" clipPath="url(#clip0_282_577)">
                <path
                    fillRule="evenodd"
                    d="M28 39.7c5.91 0 10.7-4.79 10.7-10.7 0-5.91-4.79-10.7-10.7-10.7-5.91 0-10.7 4.79-10.7 10.7 0 5.91 4.79 10.7 10.7 10.7zm0 1.3c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12z"
                    clipRule="evenodd"
                ></path>
                <path d="M27.323 30.235l-.14-6.618a.818.818 0 01.835-.835c.465 0 .852.369.843.835l-.15 6.618c-.017.387-.316.694-.693.694a.69.69 0 01-.695-.694zm-.334 3.99c0-.562.457-1.002 1.011-1.002a.998.998 0 110 1.995c-.554 0-1.01-.44-1.01-.993z"></path>
            </g>
            <defs>
                <clipPath id="clip0_282_577">
                    <path
                        fill="#fff"
                        d="M0 0H24V24H0z"
                        transform="translate(16 17)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}