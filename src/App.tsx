import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import './index.css'
import CoinPage from "./components/CoinPage/CoinPage"


function App() {
  return (
    <div className='font-sora bg-black text-white'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/>
            {/* <Route path="/watchlist" element={<WatchListPage/>}/>
            <Route path="/compair" element={<ComparePage/>}/> */}
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
