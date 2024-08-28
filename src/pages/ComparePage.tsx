import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SelectCoins from '../components/ui/SelectCoins'

const ComparePage = () => {

  const [coin1, setCoin1] = useState('bitcoin');
  const [coin2, setCoin2] = useState('ethereum');

  console.log('coin1: ' + coin1)
  console.log('coin2: ' + coin2)

  return (
    <div className='pt-28'>
        <Navbar/>
        <SelectCoins coin1={coin1} coin2={coin2} setCoin1={setCoin1} setCoin2={setCoin2}/>
    </div>
  )
}

export default ComparePage
