import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Loader from "../ui/Loader";
import { CoinDataSetter } from "../../data/CoinDataSetter";
import List from "../List";
import CoinInfo from "./CoinInfo";
import { getCoinData } from "../../utils/getCoinData";
import { getCoinPrices } from "../../utils/getCoinPrices";
import CoinChart from "./CoinChart";
import { convertDate } from "../../utils/convertDate";
import BasicSelect from "../ui/SelectButton";
import SelectButton from "../ui/SelectButton";
import { setChartData } from "../../utils/setChartData";
import { Toaster } from "react-hot-toast";
import { notify } from "../ui/toast";

interface coindata{
    id: number,
    name: string,
    symbol: string,
    image: {
        large: string,
    },
    desc: {
        en: string,
    },
    market_data: {
        price_change_percentage_24h: string;
        total_volume: {
            usd: string;
        }
        current_price: {
            usd: string,
        }
        market_cap: {
            usd: string,
        }
    }
}

const CoinPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [coinChart, setCoinChart] = useState({})
    const [days, setDays] = useState<number>(7);
    const [coinData, setCoinData] = useState<coindata>({
        id: 0,
        name: '',
        symbol: '',
        image: {
            large: '',
        },
        desc: {
            en: '',
        },
        market_data: {
            price_change_percentage_24h: '',
            total_volume: {
                usd: '',
            },
            current_price: {
                usd: '',
            },
            market_cap: {
                usd: '',
            }
        }
    });
    

    useEffect(() => {
        if (id){
            getData();
        }
    }, [id])
    
    const getData = async () => {
        const data = await getCoinData(id);
        if (data){
            const priceChange24h = parseFloat(data.market_data.price_change_percentage_24h);
            console.log(data);
            CoinDataSetter(setCoinData, data);
            const coinPrices = await getCoinPrices(id, days);
            if (coinPrices && coinPrices.length > 0){
                
                setChartData(setCoinChart, coinPrices, data.name, (priceChange24h > 0 ? 'green' : 'red'));
                setLoading(false);
                // console.log(coinPrices);
            }
        }
    }

    const handleDaysChange = async (n: number) => {
        setDays(n);
        const prices = await getCoinPrices(id, n);
        if (prices && prices.length > 0){
            const priceChange24h = parseFloat(coinData.market_data.price_change_percentage_24h);
            setChartData(setCoinChart, prices, coinData.name, (priceChange24h < 0 ? 'red' : 'green'));
            setLoading(false);
            // console.log(coinPrices);
        }
    }

    return (
        <>
            <Navbar/>
            {
                loading ? <Loader/> :
                <div className="flex flex-col  gap-4 mb-10">
                    <table className="w-full flex items-center mt-16 md:mt-28 justify-center  ">
                        <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                            <List coin={coinData}/>
                        </tbody>
                    </table>
                    <div className="space-y-3 mt-6 lg:mt-10 w-[80%] ml-auto mr-auto">
                        {/* <div className=" px-10 flex p-8 gap-8 justify-center ml-auto mr-auto w-[80%]   rounded-lg">
                            <BasicSelect/>
                        </div> */}
                        <div className="bg-[#1a1a1a] rounded-lg p-5 items-start justify-center flex flex-col gap-10 w-full">
                            <div>
                                <SelectButton handleChange={handleDaysChange}/>
                            </div>
                            <div className="w-full flex flex-col lg:h-[600px]">
                                <CoinChart chartData={coinChart} multiAxis={false}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        {coinData && <CoinInfo title={coinData.name} description={coinData.desc}/>}
                    </div>
                    <Toaster/>
                </div>
            }
        </>
    )

}

export default CoinPage;