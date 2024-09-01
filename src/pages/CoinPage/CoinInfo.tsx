import React, { useState } from 'react'

const CoinInfo = ({title, description} : {title: string, description: string}) => {

  const [desc, setDesc] = useState(false)


  const shortDesc = description.length > 350 ? description.slice(0, 350) + "<span style='color: gray' > Read More...</span>" : description;
  const longDesc = description + "<span style='color: gray' > Read Less</span>"
  return (
    <div className='w-full mr-auto ml-auto flex mt-4'>
        <div className=' bg-softDark   rounded-lg px-10 flex flex-col p-8 gap-3 justify-center '>
          <h2 className='text-xl md:text-3xl font-semibold'>{title}</h2>
          <p onClick={() => {setDesc(!desc)}} className='text-wrap text-sm md:text-lg cursor-pointer w-full desc transition-all ease-in-out' dangerouslySetInnerHTML={{__html: !desc ? shortDesc : longDesc}}></p>
        </div>
    </div>
  )
}

export default CoinInfo
