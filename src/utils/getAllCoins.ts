import { notify } from "../components/ui/toast";

export const getAllCoins = () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
        },
      };
  
      try {
        const AllCoins = fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', options)
          .then(response => response.json())
          .then((response) => {
            return response;
            })
            return AllCoins;
      } catch (err) {
        notify("Failed to Fetch the coins"); // Ensure notify can handle the error message type
      }
}