import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SelectCoins from '../components/ui/SelectCoins'
import SelectDays from '../components/ui/SelectButton';
import { getAllCoins } from '../utils/getAllCoins';
import { getCoinData } from '../utils/getCoinData';
import { CoinDataSetter } from '../utils/CoinDataSetter';
import { getCoinPrices } from '../utils/getCoinPrices';
import Loader from '../components/ui/Loader';
import List from '../components/List';
import { setChartData } from '../utils/setChartData';
import { filterUniqueDates } from './CoinPage/CoinPage';
import CoinChart from './CoinPage/CoinChart';
import SelectType from '../components/ui/SelectType';
import CoinInfo from './CoinPage/CoinInfo';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ComparePage = () => {

  const [coin1, setCoin1] = useState('bitcoin');
  const [coin2, setCoin2] = useState('ethereum');
  interface CoinData {
    name: string;
    desc?: string;
    // Add other properties if necessary
  }
  
  const [coin1Data, setCoin1Data] = useState<CoinData>();
  const [coin2Data, setCoin2Data] = useState<CoinData>();
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState<string>('prices')
  const [chartPriceData, setChartPriceData] = useState();


  const handleDaysChange = async (e: number) => {
    const newDays = e;
    // setLoading(true);
    setDays(newDays);
    let prices1 = await getCoinPrices(coin1, newDays, priceType);
    let prices2 = await getCoinPrices(coin2, newDays, priceType);
    prices1 = filterUniqueDates(prices1);
    prices2 = filterUniqueDates(prices2);
    if (coin1Data && coin2Data)
      setChartData(setChartPriceData, prices1, coin1Data.name, 'green', prices2, coin2Data.name);
    // setLoading(false);
  };

  const navigate = useNavigate();

  const handleRowClick = (e: string) => {
    if (e === '1')
      navigate(`/coin/${coin1}`);
    if (e === '2')
      navigate(`/coin/${coin2}`);
  };
  
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    setLoading(true);
    const data1 = await getCoinData(coin1);
    const data2 = await getCoinData(coin2);
    if (data1 && data2){
      CoinDataSetter(setCoin1Data, data1);
      CoinDataSetter(setCoin2Data, data2);
      let prices1 = await getCoinPrices(coin1, days, priceType)
      let prices2 = await getCoinPrices(coin2, days, priceType);
      if (prices1 && prices2){
        prices1 = filterUniqueDates(prices1);
        prices2 = filterUniqueDates(prices2);
        setChartData(setChartPriceData, prices1, data1.name, 'green', prices2, data2.name);
        setLoading(false);
      }
    }
  }
  
  const handleCoinChange = async (e: any, whichCoin: boolean) => {
    setLoading(true);
    if (whichCoin){
      const newCoin2 = e.target.value;
      setCoin2(newCoin2);
      const data2 = await getCoinData(newCoin2);
      if(data2)
        CoinDataSetter(setCoin2Data, data2);
      //Fetching prices again
      let coin1Prices = await getCoinPrices(coin1, days, priceType);
      let coin2Prices = await getCoinPrices(newCoin2, days, priceType);
      if (coin1Prices && coin2Prices){
        if (coin1Prices.length > 0 && coin2Prices.length > 0)
        {
          coin1Prices = filterUniqueDates(coin1Prices);
          coin2Prices = filterUniqueDates(coin2Prices);
          if (coin1Data) {
            setChartData(setChartPriceData, coin1Prices, coin1Data.name, 'green', coin2Prices, data2.name);
          }
        }
      }
    }else {
      const newCoin1 = e.target.value;
      setCoin1(newCoin1);
      const data1 = await getCoinData(newCoin1);
      if (data1)
        CoinDataSetter(setCoin1Data, data1);
      // fetch coin prices
      let coin1Prices = await getCoinPrices(newCoin1, days, priceType);
      let coin2Prices = await getCoinPrices(coin2, days, priceType);
      if (coin1Prices && coin2Prices){
        coin1Prices = filterUniqueDates(coin1Prices);
        coin2Prices = filterUniqueDates(coin2Prices);
        if (coin2Data) {
          setChartData(setChartPriceData, coin1Prices, data1.name, 'green', coin2Prices, coin2Data.name);
        }
      }
    }
    setLoading(false)
  }

  const handlePriceTypeChange = async (e: string) => {
    const newPriceType = e;
    setPriceType(newPriceType);
    let coin1Prices = await getCoinPrices(coin1, days, newPriceType);
    let coin2Prices = await getCoinPrices(coin2, days, newPriceType);
    if (coin1Prices && coin2Prices)
    {
      coin1Prices = filterUniqueDates(coin1Prices);
      coin2Prices = filterUniqueDates(coin2Prices);
      if (coin1Data && coin2Data)
        setChartData(setChartPriceData, coin1Prices, coin1Data.name, 'green', coin2Prices, coin2Data.name);
    }
  }


  return (
    <div className='pt-32'>
        <Navbar/>
        {loading ? <Loader/>
         : <>
     
            <div className='flex flex-col mt-8 gap-4'>
            <h1 className='w-[80%] ml-auto mr-auto font-medium md:text-3xl text-[15px] flex items-center'>&#x2022; Comparison Between{' '}
              <span className='text-orange-500 mx-1'>{coin1Data?.name}</span> and
              <span className='text-blue-500 mx-[5px]'>{coin2Data?.name}</span></h1>
              <table className="w-full flex items-center justify-center mt-2">
                <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-softDark" onClick={() => handleRowClick('1')}>
                    <List coin={coin1Data} />
                </tbody>
              </table>
              <table className="w-full flex items-center justify-center  ">
                <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-softDark" onClick={() => handleRowClick('2')}>
                    <List coin={coin2Data} />
                </tbody>
              </table>
            </div>
            <div className="bg-softDark rounded-lg p-5 items-start justify-center flex flex-col gap-10 w-[80%] ml-auto mr-auto mt-8">
            <div className='flex w-full mr-auto ml-auto justify-between items-center'>
                <div className='max-w-sm md:flex md:gap-3'>
                  <SelectDays handleChange={handleDaysChange}/>
                  <SelectType handleChange={handlePriceTypeChange}/>
                </div>
              <SelectCoins coin1={coin1} coin2={coin2} handleCoinChange={handleCoinChange}/>
              </div>
              <div className="w-full flex flex-col lg:h-[600px]">
                  <CoinChart chartData={chartPriceData} multiAxis={true} priceType={priceType} name={coin1Data?.name}/>
              </div>
            </div>
            <div className='mt-8 w-[80%] mr-auto ml-auto '>
                {coin1Data && <CoinInfo title={coin1Data.name} description={coin1Data.desc || 'There\'s No Description'}/>}
                {coin2Data && <CoinInfo title={coin2Data.name} description={coin2Data.desc || 'There\'s No Description'}/>}
            </div>
            <Footer/>
          </>
        }
    </div>
  )
}

export default ComparePage;
