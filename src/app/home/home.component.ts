import { Component } from '@angular/core'
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = []
  dropDownOpts = { 'Bitcoin': 'bitcoin', 'Ethereum': 'ethereum', 'Tether': 'tether' }

  coinA = { coin: 'Bitcoin', id: 'bitcoin' }
  updateCoinA = (data: any) => this.coinA = { coin: data.coin, id: data.id }

  coinB = { coin: 'Ethereum', id: 'ethereum' }
  updateCoinB = (data: any) => this.coinB = { coin: data.coin, id: data.id }

  constructor(private apiData: ApiDataService) {
    this.apiData.getCoinsList().then(coinData => {
      this.data = coinData
    })
    apiData.getDropdownList()
  }

  ngOnInit() {
    this.dropDownOpts = this.apiData.dropdownData
  }
}
