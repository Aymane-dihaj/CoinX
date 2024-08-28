import React, { useState } from 'react'

const CoinInfo = ({title, description} : {title: string, description: string}) => {

  const [desc, setDesc] = useState(false)


  const shortDesc = description.length > 350 ? description.slice(0, 350) + "<span style='color: gray' > Read More...</span>" : description;
  const longDesc = description + "<span style='color: gray' > Read Less</span>"
  return (
    <div className=' mt-6 items-center justify-center flex  gap-10 w-full'>
        <div className=' bg-white/[0.1] rounded-lg px-10 flex flex-col p-8 gap-8 justify-center w-[80%]'>
          <h2 className='text-3xl font-semibold'>{title}</h2>
          <p onClick={() => {setDesc(!desc)}} className='text-wrap cursor-pointer w-full desc transition-all ease-in-out' dangerouslySetInnerHTML={{__html: !desc ? shortDesc : longDesc}}></p>
        </div>
    </div>
  )
}

export default CoinInfo
