import React from 'react'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';


const List = ({coin} : any) => {
  return (
    <tr className='flex items-center justify-between  m-3 p-4 border'>
        <td className=' border text-left w-[18%] flex items-center'>
            <div className='flex gap-6 items-center '>
              <img src={coin.image} className='object-cover w-[50px]' alt="coin image" />
              <div className='flex flex-col gap-1'>
                <p className='uppercase font-semibold'>{coin.symbol}</p>
                <p className='capitalize font-light text-sm lg:text-lg text-gray-500'>{coin.name}</p>
              </div>
            </div>
        </td>
        <td className=' border text-left  flex items-center justify-start text-left border gap-3 w-[18%]'>
          <p className={`p-1 min-w-[90px] ${coin.price_change_percentage_24h > 0 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} px-3 text-center border w-fit rounded-[30px] text-sm `}>{coin.price_change_percentage_24h.toFixed(3)}%</p>
          <div className={`p-[2px] border  ${coin.price_change_percentage_24h > 0 ? 'border-green-500' : 'border-red-500'} rounded-full items-center flex justify-center`}> {
              coin.price_change_percentage_24h > 0 ?  <TrendingUpRoundedIcon className='text-green-500 '/> : <TrendingDownRoundedIcon className='text-red-500'/>}
          </div>
        </td>
        <td className=' border text-left  flex items-center'>
          <h3 className={`font-medium text-lg ${coin.price_change_percentage_24h > 0 ? 'text-green-500 ' : 'text-red-500'}`}>${coin.current_price.toLocaleString()}</h3>
        </td>
        {/* <td className='text-left w-[18%]  flex gap-6 text-left'> */}
          <td className=' border text-sm tracking-wide text-white/[0.5] text-left'>{coin.total_volume}</td>
          <td className=' border text-sm tracking-wide text-white/[0.5]'>{coin.market_cap}</td>
        {/* </td> */}
    </tr>
  )
}

export default List
