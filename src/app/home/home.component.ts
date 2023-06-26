import { Component } from '@angular/core'
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = []
  dropDownOpts = {
    'Bitcoin': 'bitcoin',
    'Ethereum': 'ethereum',
    'Tether': 'tether',
    'Solana': 'solana',
    'USD Coin': 'usd-coin'
  }

  coinA = { coin: 'Bitcoin', id: 'bitcoin' }
  updateCoinA = (data: any) => this.coinA = { coin: data.coin, id: data.id }

  coinB = { coin: 'Ethereum', id: 'ethereum' }
  updateCoinB = (data: any) => this.coinB = { coin: data.coin, id: data.id }

  constructor(apiData: ApiDataService) {
    apiData.getCoinsList().subscribe(coinData => {
      this.data = coinData
    })
  }
}
