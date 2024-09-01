import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import './index.css'
import CoinPage from "./pages/CoinPage/CoinPage"
import ComparePage from "./pages/ComparePage"
import Saved from "./pages/Saved"
import { Toaster } from "react-hot-toast"
import News from "./pages/News"


function App() {
  return (
    <div className='font-sora bg-black text-white overflow-hidden '>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/>
            <Route path="/compare" element={<ComparePage/>}/>
            <Route path="/saved" element={<Saved/>}/>
            <Route path="/latest_news" element={<News/>}/>
          </Routes>
        </BrowserRouter>
        <div className="z-50">
          <Toaster position="top-center"/>
        </div>
    </div>
  )
}

export default App
