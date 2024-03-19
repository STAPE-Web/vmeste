import { authRoutes, notAuthRoutes } from "@/router"
import { Routes, Route } from 'react-router-dom'

const AppRouter = () => {
    const sid = JSON.parse(localStorage.getItem('sid') as string)

    return (
        <>
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