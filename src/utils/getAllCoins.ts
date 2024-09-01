import axios from "axios";
import toast from "react-hot-toast";

export const getAllCoins = () => {
  
  const API_KEY = import.meta.env.VITE_API_KEY;
  const coins = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc?x_cg_demo_api_key=${API_KEY}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.message + ', Try again Later!');
    });

  return coins;
};