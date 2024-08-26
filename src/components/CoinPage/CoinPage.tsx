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

const CoinPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [coinChart, setCoinChart] = useState({})
    const [coinData, setCoinData] = useState({
        name: '',
        desc: '',
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
            const coinPrices = await getCoinPrices(id, 7);
            if (coinPrices){
                setCoinChart({
                    labels: ["mon", "tue", "wed", "thur"],
                    datasets: [
                    {
                        label: 'bitcoin',
                      data: [65, 59, 80, 81, 56, 55, 40],
                      fill: true,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1
                    },
                    ]
                })
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
                    <div>
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