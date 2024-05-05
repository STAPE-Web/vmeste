import { useState } from "react"
import styles from "./style.module.css"
import Step1 from "./Steps/1"
import { CloseIcon } from "@/ui/Icons"
import useGlobalStore from "@/store"
import Step2 from "./Steps/2"
import Step3 from "./Steps/3"
import Step4 from "./Steps/4"

const ChangeEmailModal = () => {
    const [step, setStep] = useState(1)
    const [login, setLogin] = useState("")
    const actionChangeEmailModal = useGlobalStore(state => state.actionChangeEmailModal)
    const changeEmailModal = useGlobalStore(state => state.changeEmailModal)

    function fillSteps() {
        switch (step) {
            case 1: return <Step1 setStep={setStep} setLogin={setLogin} />
            case 2: return <Step2 setStep={setStep} login={login} />
            case 3: return <Step3 setStep={setStep} setLogin={setLogin} />
            case 4: return <Step4 login={login} />
        }
    }

    return (
        <>
            {changeEmailModal && <div className={styles.Modal}>
                <div className={styles.Box}>
                    <CloseIcon className={styles.CloseIcon} onClick={() => actionChangeEmailModal(false)} />
                    {fillSteps()}
                </div>
            </div>}
        </>
    )
}

export default ChangeEmailModal