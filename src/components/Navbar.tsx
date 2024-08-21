import React from 'react'
import TemporaryDrawer from './ui/drawer'
import DashboardBtn from './ui/DashboardBtn'

const Navbar = () => {
  return (
    <div>
        <nav className='border-red-500  border p-5 flex items-center justify-between px-8 lg:px-12'>
            <div>
                <h2 className='text-white text-2xl lg:text-4xl font-bold'>Coin<span className='text-themeColor'>X</span></h2>
            </div>
            <div className='items-center hidden md:flex'>
                <ul className='text-white flex items-center gap-10'>
                    <li><a className='hover:text-gray-200' href="/">Home</a></li>
                    <li><a className='hover:text-gray-200' href="/">Compare</a></li>
                    <li><a className='hover:text-gray-200' href="/">Saved</a></li>
                    <li><a className='hover:text-gray-200' href="/"><DashboardBtn/></a></li>
                </ul>
            </div>
            <TemporaryDrawer/>
        </nav>
    </div>
  )
}

export default Navbar
 