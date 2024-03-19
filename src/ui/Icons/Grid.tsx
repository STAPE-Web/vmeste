const Grid = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            {...props}
        >
            <g clipPath="url(#clip0_1_15805)">
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9 12a1 1 0 00-1-1H1a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-7zm11 0a1 1 0 00-1-1h-7a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-7zm0-11a1 1 0 00-1-1h-7a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V1zM9 1a1 1 0 00-1-1H1a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V1z"
                    clipRule="evenodd"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_1_15805">
                    <path fill="#fff" d="M0 0H20V20H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Grid