import { notify } from "../components/ui/toast";

export const getCoinData = (id: string | undefined) => {

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
        },
    };

    try {
        const myData = fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
            .then(response => response.json())
            .then((response) => {
                return response;
            
            })
            return myData;
        
    } catch (err) {
        notify('Cannot Fetch Coins Data'); // Ensure notify can handle the error message type
    }
        

}