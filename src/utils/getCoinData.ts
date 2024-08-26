export const getCoinData = (id: string | undefined) => {

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
        },
    };

    const myData = fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
        .then(response => response.json())
        .then((response) => {
            return response;
        
        })
        .catch(err => console.error(err));

        return myData;
}