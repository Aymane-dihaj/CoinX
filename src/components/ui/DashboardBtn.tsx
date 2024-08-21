import React from 'react'
import { Link } from 'react-router-dom'

const DashboardBtn = () => {
  return (
    <Link to='/dashboard'>
      <button className='bg-themeColor text-black rounded-lg
        p-2 px-3 hover:bg-transparent hover:outline-1 hover:outline 
        hover:text-themeColor transition-all duration-300 hover:ease-in-out 
        hover:outline-themeColor cursor-pointer'>
          Dashboard
    </button>
    </Link>
  )
}

export default DashboardBtn
