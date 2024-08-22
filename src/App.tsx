import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <div className='font-sora bg-black '>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            {/* <Route path="/compair" element={<ComparePage/>}/>
            <Route path="/watchlist" element={<WatchListPage/>}/>
            <Route path="/coin/:id" element={<CoinPage/>}/> */}
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
