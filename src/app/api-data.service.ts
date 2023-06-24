import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  apiUrl: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en'

  constructor(private http: HttpClient) { }

  getCoinsList(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
}
