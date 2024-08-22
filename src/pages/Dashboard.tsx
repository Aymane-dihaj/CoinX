import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LabTabs from '../components/ui/tabs'

const Dashboard = () => {

  const [coins, setCoins] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 '
      }
    };
    
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', options)
      .then(response => response.json())
      .then(response => setCoins(response))
      .catch(err => console.error(err));
  }, [])

  console.log(coins);

  return (
    <>
      <Navbar/>
       <LabTabs coins={coins} />
    </>
  )
}

export default Dashboard
