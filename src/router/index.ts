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
import Landing2 from "@/pages/Landing2"
import Create from "@/pages/Create"
import PsychHome from "@/pages/Psych/Home"
import PsychProfile from "@/pages/Psych/Profile"
import Methods from "@/pages/Psych/Methods"
import Statistics from "@/pages/Statistics"
import Clients from "@/pages/Clients"
import Client from "@/pages/Client"
import Schedule from "@/pages/Schedule"
import Wallet from "@/pages/Psych/Wallet"
import AddSession from "@/pages/AddSession"
import Support from "@/pages/Support"
import Memo from "@/pages/Psych/Memo"

const notAuthRoutes = [
    { id: 1, path: '*', element: Auth },
    { id: 2, path: '/', element: Landing },
    { id: 3, path: '/auth', element: Auth },
    { id: 4, path: '/register', element: Register },
    { id: 5, path: '/about', element: About },
    { id: 6, path: '/psychologist', element: Landing2 },
    { id: 7, path: '/auth/psychologist', element: Auth },
    { id: 8, path: '/psychologist/create', element: Create },
];

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
    { id: 18, path: '/psychologist', element: Landing2 },
];

const psychRoutes = [
    { id: 1, path: '/psychologist/create', element: Create },
    { id: 2, path: '/', element: PsychHome },
    { id: 3, path: '/profile', element: PsychProfile },
    { id: 4, path: '/methods', element: Methods },
    { id: 5, path: '/chats', element: Chats },
    { id: 6, path: '/sessions', element: Sessions },
    { id: 7, path: '/blog', element: Blog },
    { id: 8, path: '/wallet', element: Wallet },
    { id: 9, path: '/faq', element: PsychHome },
    { id: 10, path: '/memo', element: Memo },
    { id: 11, path: '/support', element: Support },
    { id: 12, path: '/about', element: About },
    { id: 13, path: '/statistic', element: Statistics },
    { id: 14, path: '/clients', element: Clients },
    { id: 15, path: '/clients/:id', element: Client },
    { id: 16, path: '/schedule', element: Schedule },
    { id: 17, path: '/session/:id', element: Session },
    { id: 18, path: '/chat/:id', element: Chat },
    { id: 20, path: '/article/:id', element: Article },
    { id: 21, path: '/video/:id', element: Video },
    { id: 22, path: '/test/:id', element: Test },
    { id: 23, path: '/psychologist', element: Landing2 },
    { id: 24, path: '/schedule/new', element: AddSession },
];

export { notAuthRoutes, authRoutes, psychRoutes };