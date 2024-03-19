const Dots = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            fill="none"
            viewBox="0 0 16 17"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#clip0_1_15820)">
                <circle cx="8" cy="1.871" r="1.778"></circle>
                <circle cx="8" cy="14.315" r="1.778"></circle>
                <circle cx="8" cy="8.092" r="1.778"></circle>
            </g>
            <defs>
                <clipPath id="clip0_1_15820">
                    <path
                        fill="#fff"
                        d="M0 0H16V16H0z"
                        transform="translate(0 .093)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Dots