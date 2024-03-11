const Document = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M20.482 5.52l-4.32-4.32c-.72-.72-1.8-1.2-2.76-1.2h-6.96c-2.16 0-3.96 1.8-3.96 3.96v16.08c0 2.16 1.8 3.96 3.96 3.96h11.28c2.16 0 3.96-1.8 3.96-3.96V8.4c0-1.08-.48-2.16-1.2-2.88zm-1.2 14.52c0 .84-.72 1.56-1.56 1.56H6.442c-.84 0-1.56-.72-1.56-1.56V3.96c0-.84.72-1.56 1.56-1.56h6.84c.36 0 .84.12 1.08.48l4.44 4.32c.36.36.48.72.48 1.2v11.64z"
            ></path>
            <path
                fill="currentColor"
                d="M15.682 12h-7.2v2.4h7.2V12zM15.682 16.8h-7.2v2.4h7.2v-2.4z"
            ></path>
        </svg>
    )
}

export default Document