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


const CoinPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [coinChart, setCoinChart] = useState({})
    const [coinData, setCoinData] = useState({
        name: '',
        desc: '',
        price_change_percentage_24h: 0, 
    });

    useEffect(() => {
        if (id){
            getData();
        }
    }, [id])

    const getData = async () => {
        const data = await getCoinData(id);
        if (data){
            CoinDataSetter(setCoinData, data);
            const coinPrices = await getCoinPrices(id, 2);
            if (coinPrices){
                setCoinChart({
                    labels: coinPrices.map((price: Array<number>) => convertDate(price[0])),
                    datasets: [
                    {
                        label: 'bitcoin',
                      data: coinPrices.map((price: Array<number>) => (price[1])),
                      fill: true,
                      borderColor: 'gold',
                      backgroundColor: 'gold',
                      tension: 0.25,
                      borderWidth: 2,
                      pointRadius: 3,
                    },
                    ]
                })
                console.log(coinData.price_change_percentage_24h)
                setLoading(false);
                // console.log(coinPrices);
            }
        }
    }

    return (
        <>
            <Navbar/>
            {
                loading ? <Loader/> :
                <div>
                    <table className="w-full flex items-center mt-16 md:mt-28 justify-center  ">
                        <tbody className=" rounded-lg px-2 w-[80%] flex items-center justify-center  bg-white/[0.1]">
                            <List coin={coinData}/>
                        </tbody>
                    </table>
                    <div className="mt-6 items-center justify-center flex  gap-10 w-full]">
                        <CoinChart chartData={coinChart}/>
                    </div>
                    <div>
                        {coinData && <CoinInfo title={coinData.name} description={coinData.desc}/>}
                    </div>
                </div>
            }
        </>
    )

}

export default CoinPage;