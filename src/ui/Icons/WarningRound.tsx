const WarningRound = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            fill="none"
            viewBox="0 0 19 20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M10.355 6.246l-.14 6.018H9.008L8.86 6.246h1.494zM8.82 14.11c0-.214.07-.394.211-.539.145-.148.344-.222.598-.222.25 0 .447.074.592.222a.732.732 0 01.216.54.738.738 0 01-.216.533c-.145.144-.342.216-.592.216-.254 0-.453-.072-.598-.216a.748.748 0 01-.21-.534z"
            ></path>
            <circle
                cx="9.5"
                cy="10.277"
                r="8.75"
                stroke="currentColor"
                strokeWidth="1.5"
            ></circle>
        </svg>
    )
}

export default WarningRound