import Sidebar from '@/components/Sidebar'
import styles from './style.module.css'
import { ArrowLeftIcon, FullScreenIcon, PauseIcon, RewindLeftIcon, RewindRightIcon, ShareIcon } from '@/ui/Icons'
import { useNavigate, useParams } from 'react-router-dom'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { MaterialsAPI } from '@/api'
import { IVideo } from '@/types'
import Play2 from '@/ui/Icons/Play2'

const Video = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<IVideo | null>(null);
    const { id } = useParams();
    const sid = JSON.parse(localStorage.getItem("sid") as string);
    const [play, setPlay] = useState(false)

    const [sppedList, setSppedList] = useState(false)
    const [currentSpeed, setCurrentSpeeed] = useState(1)

    const getVideo = useCallback(async () => {
        const result = await MaterialsAPI.getAll(sid);
        const blogData: IVideo[] = result.result.videos.videos;
        const video: IVideo | undefined = blogData.find(i => i.id === id)
        if (video !== undefined) {
            setData(video)
        }
    }, [sid, id]);

    useEffect(() => {
        getVideo();
    }, [getVideo]);

    const videoRef = useRef<HTMLVideoElement | null>(null)

    const changePlaybackSpeed = (speed: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
            setCurrentSpeeed(speed)
        }
    }

    const [currentTime, setCurrentTime] = useState<string>('0:00 / 0:00');

    useEffect(() => {
        const updateCurrentTime = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;
                const duration = videoRef.current.duration;
                const formattedCurrentTime = formatTime(currentTime);
                const formattedDuration = formatTime(duration);
                setCurrentTime(`${formattedCurrentTime} / ${formattedDuration}`);
            }
        };

        const intervalId = setInterval(updateCurrentTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const rewindForward = () => {
        if (videoRef.current) {
            const newTime = videoRef.current.currentTime + 15;
            videoRef.current.currentTime = Math.min(newTime, videoRef.current.duration);
        }
    }

    const rewindBackward = () => {
        if (videoRef.current) {
            const newTime = videoRef.current.currentTime - 15;
            console.log(newTime)
            videoRef.current.pause();
            videoRef.current.currentTime = Math.max(newTime, 0);
            videoRef.current.play();
        }
    }

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setPlay(false)
            } else {
                videoRef.current.pause();
                setPlay(true)
            }
        }
    }

    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState(0);
    const timelineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.addEventListener('timeupdate', () => {
                setTime(video.currentTime);
            });
            video.addEventListener('loadedmetadata', () => {
                setDuration(video.duration);
            });
        }
        return () => {
            if (videoRef.current) {
                const video = videoRef.current;
                // @ts-ignore
                video.removeEventListener('timeupdate');
                // @ts-ignore
                video.removeEventListener('loadedmetadata');
            }
        };
    }, []);

    const handleTimelineClick = (e: MouseEvent<HTMLDivElement>) => {
        if (timelineRef.current !== null) {
            const timelineWidth = timelineRef.current.clientWidth;
            const clickX = e.clientX - timelineRef.current.getBoundingClientRect().left;
            const newTime = (clickX / timelineWidth) * duration;
            if (videoRef.current !== null) {
                videoRef.current.currentTime = newTime;
            }
        }
    };


    const toggleFullScreen = () => {
        if (videoRef.current) {
            if (!document.fullscreenElement) {
                videoRef.current.requestFullscreen();
            } else {
                document.exitFullscreen()
            }
        }
    };

    const speedItems = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    return (
        <main className={styles.Page}>
            <section className={styles.Container}>
                <Sidebar />

                <div className={styles.Content}>
                    <div className={styles.Top}>
                        <div className={styles.Back} onClick={() => navigate(-1)}>
                            <ArrowLeftIcon />
                            Назад
                        </div>

                        <div className={`${styles.SpeedList} ${sppedList ? styles.ActiveSpeedList : ""}`}>
                            <div className={styles.Speed} onClick={() => setSppedList(!sppedList)}>
                                <p>Скорость</p>
                                <p>{currentSpeed}x</p>
                            </div>

                            {sppedList && <div className={styles.List}>
                                {speedItems.map((i, index) => (
                                    <div onClick={() => changePlaybackSpeed(i)} key={index}>{i !== 1 ? `${i}x` : "Обычная"}</div>
                                ))}
                            </div>}
                        </div>
                    </div>

                    <div className={styles.Video}>
                        <video ref={videoRef} src={data?.link}></video>
                    </div>

                    <div className={styles.Controlls}>
                        <div className={styles.Text}>
                            <div>
                                <h3>Название видео</h3>
                                <p>Описание</p>
                            </div>

                            <h6>{currentTime}</h6>
                        </div>

                        <div className={styles.Timeline} ref={timelineRef} onClick={handleTimelineClick}>
                            <div
                                style={{ width: `${(time / duration) * 100}%` }}
                            ></div>
                        </div>

                        <div className={styles.IconsBox}>
                            <ShareIcon />

                            <div>
                                <RewindLeftIcon onClick={() => rewindBackward()} />
                                {play
                                    ? <Play2 width={25} height={25} onClick={() => togglePlayPause()} />
                                    : <PauseIcon onClick={() => togglePlayPause()} />
                                }
                                <RewindRightIcon onClick={() => rewindForward()} />
                            </div>

                            <FullScreenIcon onClick={() => toggleFullScreen()} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Video