const Chart = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="none"
            viewBox="0 0 24 25"
            {...props}
        >
            <path
                fill="currentColor"
                d="M23.529 19.12a.762.762 0 01-.292.057h-8.64a.763.763 0 110-1.526h6.798l-8.526-8.525-4.644 4.644a.763.763 0 01-1.079 0L.234 6.858l-.001-.001a.763.763 0 111.08-1.08l6.372 6.374 4.645-4.644a.762.762 0 011.079 0l9.065 9.065V9.775a.763.763 0 011.526 0v8.64a.76.76 0 01-.471.704z"
            ></path>
        </svg>
    )
}

export default Chart