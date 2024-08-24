import React from 'react'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';



const Coin = ({coin} : any) => {
  return (
<div
  className={`w-[350px] h-[310px] bg-[#1a1a1a] rounded-xl px-4 py-8 hover:outline ${coin.price_change_percentage_24h > 0 ? 'hover:outline-green-500': 'hover:outline-red-500'} transition-all ease-in-out duration-50`} style={{ outlineWidth: '1.5px' }}>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center '>
              <img src={coin.image} className='object-cover w-[50px]' alt="coin image" />
              <div className='flex flex-col gap-1'>
                <p className='uppercase font-semibold'>{coin.symbol}</p>
                <p className='capitalize font-light text-sm text-gray-500'>{coin.name}</p>
              </div>
            </div>
            <div >
              <StarBorderRoundedIcon />
            </div>
        </div>
        <div className='mt-6 flex items-center justify-start gap-3 pl-1'>
          <p className={`p-1 min-w-[100px] ${coin.price_change_percentage_24h > 0 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} px-3 text-center border w-fit rounded-[30px] text-sm`}>{coin.price_change_percentage_24h.toFixed(3)}%</p>
          <div className={`p-[2px] border ${coin.price_change_percentage_24h > 0 ? 'border-green-500' : 'border-red-500'} rounded-full items-center flex justify-center`}> {
              coin.price_change_percentage_24h > 0 ?  <TrendingUpRoundedIcon className='text-green-500 '/> : <TrendingDownRoundedIcon className='text-red-500'/>}
          </div>
        </div>
        <div className='flex items-center p-2 mt-6'>
          <h3 className={`font-medium text-xl ${coin.price_change_percentage_24h > 0 ? 'text-green-500 ' : 'text-red-500'}`}>${coin.current_price.toLocaleString()}</h3>
        </div>
        <div className='m-2 mt-4 flex flex-col gap-2'>
          <p className='text-sm tracking-wide text-white/[0.5]'>Total Volume: {coin.total_volume}</p>
          <p className='text-sm tracking-wide text-white/[0.5]'>Market Cap: ${coin.market_cap}</p>
        </div>
    </div>
  )
}

export default Coin
