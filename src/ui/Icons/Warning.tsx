const Warning = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="none"
            viewBox="0 0 24 25"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#clip0_1_3465)">
                <path d="M23.9 21.375l-11.25-19.5a.75.75 0 00-1.3 0L.1 21.375A.75.75 0 00.75 22.5h22.5a.749.749 0 00.65-1.125zM2.049 21L12 3.75 21.951 21H2.05z"></path>
                <path d="M11.25 9.75V15a.75.75 0 101.5 0V9.75a.75.75 0 10-1.5 0zM11.473 17.47a.735.735 0 000 1.058c.274.29.749.31 1.057 0a.752.752 0 000-1.057c-.277-.285-.78-.278-1.057 0z"></path>
            </g>
            <defs>
                <clipPath id="clip0_1_3465">
                    <path
                        fill="#fff"
                        d="M0 0H24V24H0z"
                        transform="translate(0 .5)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Warning