import { convertDate } from "./convertDate"

export const setChartData = (setCoinChart: any, prices1: Array<[number, number]> , name: string, color: string, prices2?: Array<[number, number]> , name2?: string
  ) => {

  const Red = 'rgba(255, 0, 0, 0.04)'
  const Green = 'rgba(0, 255, 0, 0.04)'

    if(prices2){
      setCoinChart({
        labels: prices1.map((price: Array<number>) => convertDate(price[0])),
        datasets: [
        {
          label: 'coin1',
          data: prices1.map((price: Array<number>) => (price[1])),
          fill: false,
          borderColor: 'blueviolet',
          tension: 0.25,
          borderWidth: 2,
          pointRadius: 0,
          yAxisID: 'coin1',
        },
        {
          label: 'coin2',
          data: prices2.map((price: Array<number>) => (price[1])),
          fill: false,
          borderColor: 'orange',
          tension: 0.25,
          borderWidth: 2,
          pointRadius: 0,
          yAxisID: 'coin2',
        },
        ]
      })
    }
    else{
      setCoinChart({
          labels: prices1.map((price: Array<number>) => convertDate(price[0])),
          datasets: [
          {
            label: name,
            data: prices1.map((price: Array<number>) => (price[1])),
            fill: true,
            borderColor: color === 'green' ? 'green' : 'red',
            backgroundColor: color === 'green' ? Green : Red,
            tension: 0.25,
            borderWidth: 2,
            pointRadius: 0,
            yAxisID: name,
          },
          ]
      })
    }


}