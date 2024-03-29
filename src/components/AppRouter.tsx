import { AuthAPI } from "@/api"
import { authRoutes, notAuthRoutes } from "@/router"
import { useCallback, useEffect, useState } from "react"
import { Routes, Route, useLocation } from 'react-router-dom'

const AppRouter = () => {
    const sid = JSON.parse(localStorage.getItem('sid') as string)
    const [profileFetched, setProfileFetched] = useState(false)

    const getProfile = useCallback(async () => {
        const result = await AuthAPI.getProfile(sid)
        if (result.status === 404) {
            localStorage.removeItem("sid")
            window.location.reload()
        } else {
            setProfileFetched(true)
        }
    }, [sid])

    useEffect(() => {
        if (!profileFetched && sid) {
            getProfile()
        }
    }, [profileFetched, sid, getProfile])

    return (
        <>
            <ScrollToTop />
            {sid
                ? <Routes>
                    {authRoutes.map(route => (
                        <Route path={route.path} element={<route.element />} key={route.id} />
                    ))}
                </Routes>
                : <Routes>
                    {notAuthRoutes.map(route => (
                        <Route path={route.path} element={<route.element />} key={route.id} />
                    ))}
                </Routes>
            }
        </>
    )
}

export default AppRouter

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};