export const getCoinPrices = (id: string | undefined, days: number) => {

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
        },
    };

    const myData = fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`, options)
        .then(response => response.json())
        .then((response) => {
            return response.prices;
        
        })
        .catch(err => console.error(err));

        return myData;
}