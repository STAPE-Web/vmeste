import Auth from "@/pages/Auth"
import Home from "@/pages/Home"
import Profile from "@/pages/Profile"
import Register from "@/pages/Register"
import Session from "@/pages/Sessions"
import Sessions from "@/pages/Session"
import Test from "@/pages/Test"
import Specialists from "@/pages/Specialists"
import Chats from "@/pages/Chats"
import Chat from "@/pages/Chat"
import Landing from "@/pages/Landing"
import About from "@/pages/About"
import Calendar from "@/pages/Calendar"
import Filter from "@/pages/Filter"
import Blog from "@/pages/Blog"
import Article from "@/pages/Article"
import Video from "@/pages/Video"
import Specialist from "@/pages/Specialist"

const notAuthRoutes = [
    { id: 1, path: '*', element: Auth },
    { id: 2, path: '/', element: Landing },
    { id: 3, path: '/auth', element: Auth },
    { id: 4, path: '/register', element: Register },
    { id: 5, path: '/about', element: About },
]

const authRoutes = [
    { id: 1, path: '*', element: Home },
    { id: 2, path: '/', element: Home },
    { id: 3, path: '/test/:id', element: Test },
    { id: 4, path: '/profile', element: Profile },
    { id: 5, path: '/sessions', element: Sessions },
    { id: 6, path: '/session/:id', element: Session },
    { id: 7, path: '/specialists', element: Specialists },
    { id: 8, path: '/chats', element: Chats },
    { id: 9, path: '/chat/:id', element: Chat },
    { id: 10, path: '/about', element: About },
    { id: 11, path: '/calendar', element: Calendar },
    { id: 12, path: '/filter', element: Filter },
    { id: 13, path: '/blog', element: Blog },
    { id: 14, path: '/article/:id', element: Article },
    { id: 15, path: '/video/:id', element: Video },
    { id: 16, path: '/register', element: Register },
    { id: 17, path: '/specialist/:id', element: Specialist },
]

export { notAuthRoutes, authRoutes }