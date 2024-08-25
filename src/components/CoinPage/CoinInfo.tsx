import React from 'react'

const CoinInfo = ({title, description} : {title: string, description: string}) => {
  
  return (
    <div className=' mt-6 items-center justify-center flex  gap-10 w-full'>
        <div className=' bg-white/[0.1] rounded-lg px-10 flex flex-col p-8 gap-8 justify-center w-[80%]'>
          <h2 className='text-3xl font-semibold'>{title}</h2>
          <p className='border text-wrap  w-full desc' dangerouslySetInnerHTML={{__html: description}}></p>
        </div>
    </div>
  )
}

export default CoinInfo
