import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DashboardPage from "./pages/DashboardPage"


function App() {
  return (
    <div className='font-sora bg-black '>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            {/* <Route path="/compair" element={<ComparePage/>}/>
            <Route path="/watchlist" element={<WatchListPage/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/> */}
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
