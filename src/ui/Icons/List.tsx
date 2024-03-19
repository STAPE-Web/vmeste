const List = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#clip0_1_16133)">
                <path d="M0 1a1 1 0 011-1h18a1 1 0 011 1v7a1 1 0 01-1 1H1a1 1 0 01-1-1V1zM0 12a1 1 0 011-1h18a1 1 0 011 1v7a1 1 0 01-1 1H1a1 1 0 01-1-1v-7z"></path>
            </g>
            <defs>
                <clipPath id="clip0_1_16133">
                    <path fill="#fff" d="M0 0H20V20H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default List