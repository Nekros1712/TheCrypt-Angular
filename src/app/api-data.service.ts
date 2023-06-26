import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  apiUrl: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en'

  constructor(private http: HttpClient) { }

  private formatter(timestamp: string) {
    var date = new Date(timestamp).getDate()
    var month = new Date(timestamp).getMonth() + 1
    var hour = new Date(timestamp).getHours()
    return date + "/" + month + ": " + hour;
  }

  private getChart(coin: string) {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1&interval=hourly`)
  }

  getCoinsList(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getData(coin: string) {
    return new Promise((resolve, reject) => {
      try {
        let time: any = []
        let price: any = []
        this.getChart(coin.toLocaleLowerCase())
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
}
