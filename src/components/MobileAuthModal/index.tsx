import { CloseIcon } from "@/ui/Icons"
import { FC } from "react"
import styles from "./style.module.css"
import { eventsList, myConditionList, relationshipList, workList } from "./constants"
import ButtonDefault from "@/ui/Buttons/Default"

interface Props {
    modalMode: number
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    myCondition: string[]
    setMyCondition: React.Dispatch<React.SetStateAction<string[]>>
    relationship: string[]
    setRelationship: React.Dispatch<React.SetStateAction<string[]>>
    work: string[]
    setWork: React.Dispatch<React.SetStateAction<string[]>>
    events: string[]
    setEvents: React.Dispatch<React.SetStateAction<string[]>>
}

const MobileAuthModal: FC<Props> = ({ modalMode, setModal, events, myCondition, relationship, setEvents, setMyCondition, setRelationship, setWork, work }) => {
    function selectItem(items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>, value: string) {
        if (items.includes(value)) {
            const updatedItems = items.filter(i => i !== value);
            setItems(updatedItems);
        } else {
            setItems(prevItems => [...prevItems, value]);
        }
    }

    function fillContent() {
        switch (modalMode) {
            case 0: return <>
                <h2>Моё состояние</h2>
                <div className={styles.List}>
                    {myConditionList.map((i, index) => (
                        <div key={index}
                            className={myCondition.includes(i.name) ? styles.Active : ""}
                            onClick={() => selectItem(myCondition, setMyCondition, i.name)}
                        >
                            <i.icon width={24} height={24} />
                            {i.name}
                        </div>
                    ))}
                </div>
            </>

            case 1: return <>
                <h2>Отношения</h2>
                <div className={styles.List}>
                    {relationshipList.map((i, index) => (
                        <div key={index}
                            className={relationship.includes(i.name) ? styles.Active : ""}
                            onClick={() => selectItem(relationship, setRelationship, i.name)}
                        >
                            <i.icon width={24} height={24} />
                            {i.name}
                        </div>
                    ))}
                </div>
            </>

            case 2: return <>
                <h2>Работа, учеба</h2>
                <div className={styles.List}>
                    {workList.map((i, index) => (
                        <div key={index}
                            className={work.includes(i.name) ? styles.Active : ""}
                            onClick={() => selectItem(myCondition, setWork, i.name)}
                        >
                            <i.icon width={24} height={24} />
                            {i.name}
                        </div>
                    ))}
                </div>
            </>

            case 3: return <>
                <h2>События в жизни</h2>
                <div className={styles.List}>
                    {eventsList.map((i, index) => (
                        <div key={index}
                            className={events.includes(i.name) ? styles.Active : ""}
                            onClick={() => selectItem(events, setEvents, i.name)}
                        >
                            <i.icon width={24} height={24} />
                            {i.name}
                        </div>
                    ))}
                </div>
            </>
        }
    }

    return (
        <div className={styles.Modal}>
            <div className={styles.ModalBox}>
                <div className={styles.Top}>
                    <span></span>
                    <div className={styles.Line}></div>
                    <div className={styles.CloseIcon} onClick={() => setModal(false)}>
                        <CloseIcon width={10} height={10} />
                    </div>
                </div>

                {fillContent()}

                <ButtonDefault disabled={false} onClick={() => setModal(false)}>Сохранить</ButtonDefault>
            </div>
        </div>
    )
}

export default MobileAuthModal