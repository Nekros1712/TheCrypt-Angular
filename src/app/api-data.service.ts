import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  apiUrl: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en'
  dropdownData: any = {}
  
  constructor(private http: HttpClient) { }

  private formatter(timestamp: string) {
    var date = new Date(timestamp).getDate()
    var month = new Date(timestamp).getMonth() + 1
    var hour = new Date(timestamp).getHours()
    return date + "/" + month + ": " + hour;
  }

  private bigNumFormat(num: number, digits: number) {

		const lookup = [
			{ value: 1, symbol: "" },
			{ value: 1e3, symbol: "k" },
			{ value: 1e6, symbol: "M" },
			{ value: 1e9, symbol: "B" }
		]

		const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
		var item = lookup.slice().reverse().find(item => num >= item.value)

		return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + " " + item.symbol : "0"
	}

  private getData(coin: string) {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1&interval=hourly`)
  }

  getCoinsList(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getChartData(coin: string) {
    return new Promise((resolve, reject) => {
      try {
        let time: any = []
        let price: any = []
        this.getData(coin.toLocaleLowerCase())
          .then(res => {
            res.data.prices.map((item: any) => {
                time.push(this.formatter(item[0]))
                price.push(item[1])
                return null
            })
            resolve({time, price})
          })
      } catch (error) {
        reject()
      }
    })
  }

  getCoinData(coin: string) {
    return new Promise((resolve, reject) => {
      try {
        let data = {}
        axios.get("https://api.coingecko.com/api/v3/coins/" + coin.toLocaleLowerCase() + "/")
          .then(res => {
            const obj = res.data
            const marketData = obj.market_data
            const cap = marketData.market_cap.usd || ''
            const circ = marketData.circulating_supply || ''
            const tot = marketData.total_supply || ''
    
            data = {
              marketRank: obj.market_cap_rank,
              currentPrice: marketData.current_price.usd || 0,
              marketCap: this.bigNumFormat(parseFloat(cap), cap.length),
              circSupply: this.bigNumFormat(parseFloat(circ), circ.length),
              totalSupply: (tot !== null) ? this.bigNumFormat(parseFloat(tot), tot.length) : "na",
              percentChange: {
                day: Number(marketData.price_change_percentage_24h),
                week: Number(marketData.price_change_percentage_7d),
                month: Number(marketData.price_change_percentage_30d),
                year: Number(marketData.price_change_percentage_1y)
              }
            }
            resolve({ data })
          })
      } catch (error) {
        reject()
      }
    })
  }

  getDropdownList() {
    this.getCoinsList().subscribe(coinData => {
      coinData.forEach((coin: any) => {
        this.dropdownData[coin.name] = coin.id
      })
    })
  }
}
