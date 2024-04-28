import { appConfig } from "@/utils"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useEffect, useState } from "react"
import styles from "./style.module.css"
import useGlobalStore from "@/store"
import { useLocation, useNavigate } from "react-router-dom"
import { MessageIcon } from "@/ui/Icons"


const VideoCall = () => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)
    const userInfo = { userID: userData.type === "email" ? userData.email : userData.phone, userName: userData.name };
    const [showVideo, setShowVideo] = useState(false)
    const callId = useGlobalStore(state => state.callId)
    const changeCallJoined = useGlobalStore(state => state.changeCallJoined)
    const callJoined = useGlobalStore(state => state.callJoined)
    const psychId = useGlobalStore(state => state.psychId)
    const navigate = useNavigate()

    const myMeeting = async (element: any) => {
        if (callId !== "") {
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appConfig.appID, appConfig.serverSecret, callId, userInfo.userID, userInfo.userName)
            const zc = ZegoUIKitPrebuilt.create(kitToken)
            zc.joinRoom({
                container: element,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: false,
                showTextChat: false,
                showRoomDetailsButton: false,
                showUserList: false,
                onJoinRoom: () => {
                    changeCallJoined(true)
                },
                onLeaveRoom: () => {
                    changeCallJoined(false)
                },
            })
        }
    }

    const location = useLocation();
    useEffect(() => {
        if (location.pathname.split("/")[1] === "session") {
            setShowVideo(true)
        } else {
            setShowVideo(false)
        }
    }, [location, setShowVideo])

    return (
        <>
            <section className={`${styles.Section} ${!showVideo ? styles.Hidden : ""}`}>
                {callJoined && <button onClick={() => navigate(`/chat/${psychId}`)} className={styles.MessageButton}><MessageIcon /></button>}
                <div ref={myMeeting}></div>
            </section>
        </>
    )
}

export default VideoCall