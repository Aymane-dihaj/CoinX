import React from 'react'
import DashboardBtn from './ui/DashboardBtn'
import {motion} from 'framer-motion'

const Hero = () => {
  return (
    <main className='h-full flex flex-col lg:flex-row md:justify-evenly lg:justify-between pt-32 md:pt-60 w-full border border-red-500 gap-0 md:p-10 p-5 '>
      <div className=' flex flex-col justify-center h-fit gap-3 lg:pl-10'>
          <h1 className='text-white text-5xl text-center lg:text-start md:text-6xl lg:text-8xl max-w-4xl md:max-w-4xl lg:max-w-3xl font-semibold '>Real-Time Crypto <span className='text-themeColor'>Insights</span></h1>
          <p className='text-[#888] md:my-4 text-xs text-center md:text-start leading-2xl md:text-lg tracking-wide w-full'>Stay ahead with live crypto price tracking and instant market updates.</p>
          <div className='mt-2 w-full flex items-center  lg:justify-start justify-center'>
            <DashboardBtn/>
          </div>
      </div>

      <motion.div 
        initial={{y: -30,}}
        animate={{y: 10}}
        transition={{
          type: 'smooth',
          repeatType: 'mirror',
          duration: 2,
          repeat: Infinity,
        }}
        className='h-fit w-full flex items-center lg:max-w-[50%] justify-center  relative '>
            <img src="/iphone.png" className='w-full max-w-3xl lg:-mt-24 object-cover' alt="" />
      </motion.div>
    </main>
  )
}

export default Hero
