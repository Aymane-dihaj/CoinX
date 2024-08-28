import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SelectCoins from '../components/ui/SelectCoins'
import { notify } from '../components/ui/toast';
import SelectDays from '../components/ui/SelectButton';
import { getAllCoins } from '../utils/getAllCoins';
import { getCoinData } from '../utils/getCoinData';
import { CoinDataSetter } from '../utils/CoinDataSetter';
import { getCoinPrices } from '../utils/getCoinPrices';
import Loader from '../components/ui/Loader';
import { Toaster } from 'react-hot-toast';
import List from '../components/List';
import { setChartData } from '../utils/setChartData';

const ComparePage = () => {

  const [coin1, setCoin1] = useState('bitcoin');
  const [coin2, setCoin2] = useState('ethereum');
  const [coin1Data, setCoin1Data] = useState();
  const [coin2Data, setCoin2Data] = useState();
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState('prices')
  const [chartPriceData, setChartPriceData] = useState();


  const handleDaysChange = async (n: number) => {
    try {
        setDays(n);
    
    }catch (error) {
        console.error("Failed to fetch coin prices:", error);
        notify("Failed to fetch coin Data. Please try again later.");
    }
  };

  
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    setLoading(true);
    const data1 = await getCoinData(coin1);
    if (data1){
      CoinDataSetter(setCoin1Data, data1);
      const data2 = await getCoinData(coin2);
      if (data2){
        CoinDataSetter(setCoin2Data, data2);
        const prices1 = await getCoinPrices(coin1, days, priceType);
        const prices2 = await getCoinPrices(coin2, days, priceType);
        if (prices1.length > 0 && prices2.length > 0){
          setChartData(setChartPriceData, prices1, prices2);
            // console.log('prices1 fetched: ' + prices1)
            // console.log('prices2 fetched: ' + prices2)
            setLoading(false); 
        }
      }
    }
  }
  
  const handleCoinChange = async (e: any, whichCoin: boolean) => {
    // setLoading(true);
    if (whichCoin){
        setCoin2(e.target.value);
        const data = await getCoinData(e.target.value);
          if (data) {
            CoinDataSetter(setCoin2Data, data);
            const priceChange24h = parseFloat(data.market_data.price_change_percentage_24h);
            // if (coinPrices && coinPrices.length > 0) {
                // coinPrices = filterUniqueDates(coinPrices);
                // setChartData(setCoinChart, coinPrices, data.name, priceChange24h > 0 ? 'green' : 'red');
                setLoading(false);
            }
    }
    else{
      setCoin1(e.target.value);
      const data = await getCoinData(e.target.value);
      if (data) {
        CoinDataSetter(setCoin2Data, data);
          const priceChange24h = parseFloat(data.market_data.price_change_percentage_24h);
          // if (coinPrices && coinPrices.length > 0) {
              // coinPrices = filterUniqueDates(coinPrices);
              // setChartData(setCoinChart, coinPrices, data.name, priceChange24h > 0 ? 'green' : 'red');
              setLoading(false);
          }
      }
      let coin1Prices = await getCoinPrices(coin1, days, priceType);
      let coin2Prices = await getCoinPrices(coin2, days, priceType);
    // console.log(e.target.value)
}
  // console.log('coin1: ' + coin1)
  // console.log('coin2: ' + coin2)
  console.log(coin1Data);
  console.log('-------------');
  console.log(coin2Data);

  return (
    <div className='pt-32'>
        <Navbar/>
        {loading ? <Loader/>
         : <>
            <div className='block md:flex w-[80%] mt-10 mr-auto ml-auto justify-between items-center'>
              <div>
                <SelectDays handleChange={handleDaysChange}/>
                {/* <SelectType handleChange={handleTypeChange}/> */}
              </div>
              <SelectCoins coin1={coin1} coin2={coin2} handleCoinChange={handleCoinChange}/>
            </div>
            <div className='flex flex-col mt-8 gap-4'>
              <table className="w-full flex items-center justify-center  ">
                <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                    <List coin={coin1Data}/>
                </tbody>
              </table>
              <table className="w-full flex items-center justify-center  ">
                <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                    <List coin={coin2Data}/>
                </tbody>
              </table>
            </div>
            <Toaster/>
          </>
        }
    </div>
  )
}

export default ComparePage
