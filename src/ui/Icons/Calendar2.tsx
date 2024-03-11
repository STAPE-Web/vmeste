const Calendar2 = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#clip0_1_7916)">
                <path
                    fillRule="evenodd"
                    d="M6 0a1.2 1.2 0 011.2 1.2v1.2h9.6V1.2a1.2 1.2 0 112.4 0v1.2h1.2A3.6 3.6 0 0124 6v14.4a3.6 3.6 0 01-3.6 3.6H3.6A3.6 3.6 0 010 20.4V6a3.6 3.6 0 013.6-3.6h1.2V1.2A1.2 1.2 0 016 0zM2.4 7.5h19.2v12.9a1.2 1.2 0 01-1.2 1.2H3.6a1.2 1.2 0 01-1.2-1.2V7.5z"
                    clipRule="evenodd"
                ></path>
                <circle cx="6" cy="11.5" r="1.5"></circle>
                <circle cx="6" cy="17.5" r="1.5"></circle>
                <circle cx="12" cy="11.5" r="1.5"></circle>
                <circle cx="12" cy="17.5" r="1.5"></circle>
                <circle cx="18" cy="11.5" r="1.5"></circle>
                <circle cx="18" cy="17.5" r="1.5"></circle>
            </g>
            <defs>
                <clipPath id="clip0_1_7916">
                    <path fill="#fff" d="M0 0H24V24H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Calendar2