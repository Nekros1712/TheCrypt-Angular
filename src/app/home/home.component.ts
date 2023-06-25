import { Component } from '@angular/core'
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = []

  coinA = 'bitcoin'
  dropDownOptsA = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  updateChartA = (newCoin: string): string => this.coinA = newCoin

  constructor(apiData: ApiDataService) {
    apiData.getCoinsList().subscribe(coinData => {
      this.data = coinData
    })
  }
}
