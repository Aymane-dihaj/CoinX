import DashboardBtn from './ui/DashboardBtn'
import {easeInOut, motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <main className='flex flex-col lg:flex-row md:justify-evenly h-[100vh] lg:justify-between pt-48 lg:pt-28   md:items-center w-full gap-0 p-5 '>
      <div className=' flex flex-col lg:pt-32 h-fit gap-3 lg:pl-10 lg:h-full items-center'>
          <motion.h1
            initial={{
              opacity: 0,
              y: -200,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
              ease: easeInOut,
            }}
            className='text-white text-4xl text-center lg:text-start md:text-6xl lg:text-8xl max-w-4xl md:max-w-4xl 
          lg:max-w-3xl font-semibold '>Real-Time Crypto <span className='text-themeColor'>Insights</span></motion.h1>
          <motion.p 
            initial={{
              opacity: 0,
              x: -200,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .8,
              ease: easeInOut,
            }}
            className='text-[#888] md:my-4 text-xs text-center md:text-start leading-2xl md:text-lg tracking-wide w-[80%] lg:w-full'>Stay ahead with live crypto price tracking and instant market updates.</motion.p>
          <motion.div
            initial={{
              opacity: 0,
              y: 200,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
              ease: easeInOut,
            }}
            className='mt-2 w-full flex items-center  lg:justify-start justify-center'>
            <Link to='/dashboard'><DashboardBtn/></Link>
          </motion.div>
      </div>

      <motion.div
        initial={{y: -20,}}
        animate={{y: 0}}
        transition={{
          type: 'smooth',
          repeatType: 'mirror',
          duration: 2,
          repeat: Infinity,
        }}
        className='w-full flex items-center lg:max-w-[50%] justify-center relative'
       >
      <motion.div 
   
        initial={{
          opacity: 0,
          y: 200,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .8,
          ease: easeInOut,
        }}
        className='w-[90%]'>
            <img src="/iphone.png" className='w-full lg:max-w-3xl md:max-w-2xl object-cover' alt="" />
      </motion.div>
      </motion.div>
    </main>
  )
}

export default Hero
