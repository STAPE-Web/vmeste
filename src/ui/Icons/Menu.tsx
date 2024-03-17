const Menu = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="24"
            fill="none"
            viewBox="0 0 37 24"
            {...props}
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="4"
                d="M2 2h33M2 12h33M2 22h33"
            ></path>
        </svg>
    )
}

export default Menu