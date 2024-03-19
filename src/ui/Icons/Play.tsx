const Play = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="47"
            height="47"
            fill="none"
            viewBox="0 0 47 47"
            {...props}
        >
            <g clipPath="url(#clip0_1_15813)">
                <g filter="url(#filter0_bi_1_15813)">
                    <circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="#000"
                        fillOpacity="0.25"
                    ></circle>
                    <circle
                        cx="24"
                        cy="24"
                        r="22.917"
                        stroke="url(#paint0_linear_1_15813)"
                        strokeOpacity="0.2"
                        strokeWidth="1.833"
                    ></circle>
                </g>
                <path
                    fill="#fff"
                    d="M20.536 15.627c-1.58-.907-2.86-.164-2.86 1.656v13.432c0 1.822 1.28 2.563 2.86 1.658l11.74-6.733c1.58-.906 1.58-2.375 0-3.28l-11.74-6.733z"
                ></path>
            </g>
            <defs>
                <filter
                    id="filter0_bi_1_15813"
                    width="66"
                    height="65.999"
                    x="-9"
                    y="-9"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="4.583"
                    ></feGaussianBlur>
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_1_15813"
                    ></feComposite>
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_1_15813"
                        result="shape"
                    ></feBlend>
                    <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    ></feColorMatrix>
                    <feMorphology
                        in="SourceAlpha"
                        operator="dilate"
                        radius="0.669"
                        result="effect2_innerShadow_1_15813"
                    ></feMorphology>
                    <feOffset dx="-0.335" dy="0.335"></feOffset>
                    <feGaussianBlur stdDeviation="0.167"></feGaussianBlur>
                    <feComposite
                        in2="hardAlpha"
                        k2="-1"
                        k3="1"
                        operator="arithmetic"
                    ></feComposite>
                    <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"></feColorMatrix>
                    <feBlend in2="shape" result="effect2_innerShadow_1_15813"></feBlend>
                </filter>
                <linearGradient
                    id="paint0_linear_1_15813"
                    x1="40.855"
                    x2="24"
                    y1="5.016"
                    y2="46"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#fff"></stop>
                    <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                </linearGradient>
                <clipPath id="clip0_1_15813">
                    <path fill="#fff" d="M0 0H47V47H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Play