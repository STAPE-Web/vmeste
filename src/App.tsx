import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/components/AppRouter"
import Header from "@/components/Header"
import VideoCall from "./components/VideoCall"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <VideoCall />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
