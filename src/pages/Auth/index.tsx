import { useEffect, useState } from "react"
import styles from "./style.module.css"
import Phone from "@/components/AuthContent/Phone"
import Email from "@/components/AuthContent/Email"
import SMS from "@/components/AuthContent/SMS"
import Code from "@/components/AuthContent/Code"
import Hello from "@/components/AuthContent/Hello"

const Auth = () => {
    const [state, setState] = useState<"Phone" | "Email" | "SMS" | "Code" | "Hello">("SMS")
    const [authData, setAuthData] = useState("")

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';

        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []);

    function fillContent() {
        switch (state) {
            case "Phone": return <Phone setAuthData={setAuthData} setState={setState} />
            case "Email": return <Email setAuthData={setAuthData} setState={setState} />
            case "SMS": return <SMS authData={authData} setState={setState} />
            case "Code": return <Code authData={authData} setState={setState} />
            case "Hello": return <Hello />
        }
    }

    return (
        <main className={styles.Page}>
            {fillContent()}
        </main>
    )
}

export default Auth