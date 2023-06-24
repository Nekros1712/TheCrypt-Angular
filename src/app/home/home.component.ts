import { Component } from '@angular/core'
import { ApiDataService } from '../api-data.service'
import { ChartService } from '../chart.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = []
  coinNameA = 'bitcoin'
  coinNameB = 'ethereum'

  dropDownOptsA = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  dropDownOptsB = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  selectedOptA = this.dropDownOptsA[0]
  selectedOptB = this.dropDownOptsB[3]

  constructor(apiData: ApiDataService, private chartService: ChartService) {
    apiData.getCoinsList().subscribe(coinData => {
      this.data = coinData
    })
  }

  ngOnInit() {
    this.chartService.currentData.subscribe(coin => {
      this.coinNameA = coin.toLocaleLowerCase()
    })
  }
}
