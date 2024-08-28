import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import './index.css'
import CoinPage from "./pages/CoinPage/CoinPage"
import ComparePage from "./pages/ComparePage"


function App() {
  return (
    <div className='font-sora bg-black text-white'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/>
            <Route path="/compare" element={<ComparePage/>}/>
            {/* <Route path="/watchlist" element={<WatchListPage/>}/> */}
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
