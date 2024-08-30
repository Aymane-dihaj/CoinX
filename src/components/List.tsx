import React from 'react'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


const List = ({coin, delay} : {coin: any, delay: number
}) => {

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/coin/${coin.id}`);
  };

  return (
    // <Link to={`/coin/${coin.id}`} className='w-full'>
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: delay }}
      className='w-full'
    >
      
      <tr onClick={handleRowClick} className=' flex items-center justify-between w-full  p-5 cursor-pointer  hover:bg-white/[0.1]  hover:rounded-xl transition-all ease-in-out'>
          <Tooltip title='Name'>
            <td className=' w-[33%] md:w-[20%]  text-left  flex items-center'>
                <div className='flex lg:gap-6 md:gap-4 gap-3 items-center '>
                  <img src={coin.image} className='object-cover lg:w-[50px] w-[30px]' alt="coin image" />
                  <div className='flex flex-col gap-1'>
                    <p className='uppercase md:font-semibold text-xs lg:text-lg'>{coin.symbol}</p>
                    <p className='capitalize font-light text-xs  lg:text-sm text-gray-500'>{coin.name}</p>
                  </div>
                </div>
            </td>
          </Tooltip>
          <Tooltip title="Price Change Percentage In 24h">
            <td className='w-[33%] md:w-[20%] flex items-center justify-center md:gap-3'>
              <p className={`p-1 min-w-[80px] ${coin.price_change_percentage_24h > 0 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} px-3 text-center border w-fit rounded-[30px] md:text-sm text-xs`}>{coin.price_change_percentage_24h.toFixed(3)}%</p> 
              <div className={`p-[2px] hidden md:flex border  ${coin.price_change_percentage_24h > 0 ? 'border-green-500' : 'border-red-500'} rounded-full items-center flex justify-center`}> {
                coin.price_change_percentage_24h > 0 ?  <TrendingUpRoundedIcon className='text-green-500 '/> : <TrendingDownRoundedIcon className='text-red-500'/>}
              </div>
            </td>
          </Tooltip>
          <Tooltip title="Price">
            <td className=' w-[33%] md:w-[20%]  text-center  flex items-center'>
              <h3 className={`font-medium lg:text-lg text-sm text-center  w-full ${coin.price_change_percentage_24h > 0 ? 'text-green-500 ' : 'text-red-500'}`}>${coin.current_price.toLocaleString()}</h3>
            </td>
          </Tooltip>
          <Tooltip title="Total Volume">
            <td className='hidden lg:flex lg:justify-center w-[33%] md:w-[20%] text-white/[0.7] text-sm '>{coin.total_volume}</td>
          </Tooltip>
          <Tooltip title="Market Cap">
            <td className='hidden lg:flex w-[33%]  lg:text-center lg:justify-center md:w-[20%] text-white/[0.7] text-sm'>${coin.market_cap}</td>
          </Tooltip>
          {/* </td> */}
      </tr>
      </motion.div>
  )
}

export default List
