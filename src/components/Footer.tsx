import React from 'react'
import { BsGithub } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";


const Footer = () => {
  return (
    <div>
       <div className='border-t border-[#1a1a1a] flex flex-row-reverse pt-4 p-3 mt-36 gap-3 w-full justify-center items-center'>
        <div className='flex items-center gap-5 '>
            <BsGithub size={20}/>
        </div>
        <p className='text-sm tracking-wide font-medium flex'>© Developed With <FaHeart color='' className='mx-1'/>, By Aymane Dihaj.</p>
    </div>
    </div>
  )
}

export default Footer
