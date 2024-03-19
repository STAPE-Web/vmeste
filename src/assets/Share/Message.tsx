const Message = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="47"
            height="47"
            fill="none"
            viewBox="0 0 47 47"
            {...props}
        >
            <g clipPath="url(#clip0_1_17640)">
                <path
                    fill="url(#paint0_linear_1_17640)"
                    d="M23.5 47C36.479 47 47 36.479 47 23.5S36.479 0 23.5 0 0 10.521 0 23.5 10.521 47 23.5 47z"
                ></path>
                <path
                    fill="#fff"
                    d="M32.537 14.429c-8.156-7.885-21.654-2.167-21.66 8.957 0 2.223.583 4.391 1.693 6.306l-1.8 6.536 6.72-1.752c8.386 4.53 18.735-1.485 18.739-11.084 0-3.369-1.316-6.54-3.707-8.922l.015-.041z"
                ></path>
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_1_17640"
                    x1="23.5"
                    x2="23.5"
                    y1="-0.004"
                    y2="46.653"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#61FE7D"></stop>
                    <stop offset="1" stopColor="#26CF44"></stop>
                </linearGradient>
                <clipPath id="clip0_1_17640">
                    <path fill="#fff" d="M0 0H47V47H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Message