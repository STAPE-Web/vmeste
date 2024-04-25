import { appConfig } from "@/utils"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    id: string
}

const VideoCall: FC<Props> = ({ id }) => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)
    const userInfo = { userID: userData.type === "email" ? userData.email : userData.phone, userName: userData.name };

    const myMeeting = async (element: any) => {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appConfig.appID, appConfig.serverSecret, id, userInfo.userID, userInfo.userName)
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: false,
            showTextChat: true,
            showRoomDetailsButton: false,
            showUserList: false,
        })
    }

    return (
        <section className={styles.Section}>
            <div ref={myMeeting}></div>
        </section>
    )
}

export default VideoCall