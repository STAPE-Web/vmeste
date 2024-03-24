const Card = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#clip0_1_9876)">
                <path d="M20.73 21.845a3.774 3.774 0 003.77-3.77V6.547a3.774 3.774 0 00-3.77-3.77H4.27A3.774 3.774 0 00.5 6.547v11.528a3.774 3.774 0 003.77 3.77h16.46zM4.27 3.999h16.46a2.55 2.55 0 012.548 2.548v.886H1.722v-.886A2.55 2.55 0 014.27 4zM1.722 18.075v-9.42h21.556v9.42a2.551 2.551 0 01-2.548 2.548H4.27a2.55 2.55 0 01-2.548-2.548z"></path>
                <path d="M7.263 17.855a.611.611 0 100-1.222h-2.66a.611.611 0 000 1.222h2.66z"></path>
            </g>
            <defs>
                <clipPath id="clip0_1_9876">
                    <path
                        fill="#fff"
                        d="M0 0H24V24H0z"
                        transform="translate(.5 .777)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}

export default Card