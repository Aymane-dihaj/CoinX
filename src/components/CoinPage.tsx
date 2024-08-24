import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./ui/Loader";
import { CoinDataSetter } from "../data/CoinDataSetter";
import List from "./List";

const CoinPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [coinData, setCoinData] = useState({});

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
            },
          };
      
          fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
            .then(response => response.json())
            .then((response) => {
                CoinDataSetter(setCoinData, response)
                setLoading(false);
                console.log(id)
              })
            .catch(err => console.error(err));
    }, [id])

    return (
        <>
            <Navbar/>
            {
                loading ? <Loader/> :
                <table className="w-full flex items-center mt-16 md:mt-28 justify-center ">
                    <tbody className=" bg-white/[0.1] rounded-lg flex items-center justify-center w-[90%]">
                        <List coin={coinData}/>
                    </tbody>
                </table> 
            }
        </>
    )

}

export default CoinPage;