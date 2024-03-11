const Russian = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            fill="none"
            viewBox="0 0 20 21"
            {...props}
        >
            <g clipPath="url(#clip0_140_10661)">
                <mask
                    id="mask0_140_10661"
                    style={{ maskType: "alpha" }}
                    width="20"
                    height="21"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                >
                    <circle cx="10" cy="10.5" r="10" fill="#D9D9D9"></circle>
                </mask>
                <g fillRule="evenodd" clipRule="evenodd" mask="url(#mask0_140_10661)">
                    <path fill="#fff" d="M-2.915.541h25.83v19.666h-25.83V.541z"></path>
                    <path
                        fill="#0039A6"
                        d="M-2.915 7.293h25.83v12.915h-25.83V7.293z"
                    ></path>
                    <path
                        fill="#D52B1E"
                        d="M-2.915 13.75h25.83v6.751h-25.83V13.75z"
                    ></path>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_140_10661">
                    <path
                        fill="#fff"
                        d="M0 0H20V20H0z"
                        transform="translate(0 .5)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Russian