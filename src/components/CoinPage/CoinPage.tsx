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
                      pointRadius: 0,
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
                <div className="flex flex-col  gap-4 mb-10">
                    <table className="w-full flex items-center mt-16 md:mt-28 justify-center  ">
                        <tbody className=" rounded-lg  w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                            <List coin={coinData}/>
                        </tbody>
                    </table>
                    <div className="space-y-3 mt-6 lg:mt-10 w-[80%] ml-auto mr-auto">
                        {/* <div className=" px-10 flex p-8 gap-8 justify-center ml-auto mr-auto w-[80%]   rounded-lg">
                            <BasicSelect/>
                        </div> */}
                        <div className="bg-[#1a1a1a] rounded-lg p-5 items-start justify-center flex flex-col gap-10 w-full">
                            <div>
                                <BasicSelect/>
                            </div>
                            <CoinChart chartData={coinChart} multiAxis={false}/>
                        </div>
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