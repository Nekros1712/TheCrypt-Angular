import { Component } from '@angular/core'
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = []

  coinA = 'Bitcoin'
  dropDownOptsA = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  updateCoinA = (newCoin: string): string => this.coinA = newCoin

  coinB = 'Ethereum'
  dropDownOptsB = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  updateCoinB = (newCoin: string): string => this.coinB = newCoin

  constructor(apiData: ApiDataService) {
    apiData.getCoinsList().subscribe(coinData => {
      this.data = coinData
    })
  }
}
