import { appConfig } from "@/utils"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useEffect, useState } from "react"
import styles from "./style.module.css"
import useGlobalStore from "@/store"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeftIcon, MessageIcon } from "@/ui/Icons"

const VideoCall = () => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) return;
    const userInfo = { userID: userData.email || userData.phone || userData.id, userName: userData.username || userData.name };
    const [showVideo, setShowVideo] = useState(false)
    const callId = useGlobalStore(state => state.callId)
    const changeCallJoined = useGlobalStore(state => state.changeCallJoined)
    const callJoined = useGlobalStore(state => state.callJoined)
    const psychId = useGlobalStore(state => state.psychId)
    const opponentName = useGlobalStore(state => state.opponentName)
    const leftTime = useGlobalStore(state => state.leftTime)
    const sessionJoined = useGlobalStore(state => state.sessionJoined)
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

            // const zcc = new ZegoExpressEngine(appConfig.appID, appConfig.serverSecret)
            // const localStream = await zcc.createStream({ camera: { video: true, audio: false, videoInput:  }, })
            // console.log(localStream)
            // zcc.setBackgroundBlurOptions(localStream, { blurDegree: 50 })
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
            {sessionJoined && <section className={`${styles.Section} ${!showVideo ? styles.Hidden : ""}`} style={callJoined ? { background: "#000", padding: 0 } : { background: "#fff" }}>
                {!callJoined && <>
                    <div className={styles.Top}>
                        <ArrowLeftIcon onClick={() => navigate(-1)} />
                        <h2>{opponentName}</h2>
                        <span></span>
                    </div>

                    <div className={styles.Box}>
                        {leftTime !== "00:00:00" && <p>Дождитесь начала сессии и подключайтесь</p>}
                        {leftTime === "00:00:00" && <h4>Сессия началась</h4>}

                        {leftTime !== "00:00:00" && <div className={styles.Column}>
                            <h3>{leftTime}</h3>
                        </div>}
                    </div>
                </>}

                {callJoined && <button onClick={() => navigate(`/chat/${psychId || "123"}`)} className={styles.MessageButton}><MessageIcon /></button>}
                <div ref={myMeeting}></div>
            </section>}
        </>
    )
}

export default VideoCall