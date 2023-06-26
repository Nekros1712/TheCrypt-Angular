import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-coindata',
  templateUrl: './coindata.component.html',
  styleUrls: ['./coindata.component.css']
})
export class CoindataComponent {
  @Input() coin = ''

  data = {
    marketRank: '...',
    currentPrice: '...',
    marketCap: '...',
    circSupply: '...',
    totalSupply: '...',
    percentChange: {
      day: 0,
      week: 0,
      month: 0,
      year: 0
    }
  }

  constructor(private apiService: ApiDataService) {}

  update(coin: string) {
    this.coin = coin
    this.apiService.getCoinData(coin).then((res: any) => {
      this.data = res.data
    })
  }

  ngOnInit() {
    this.apiService.getCoinData(this.coin).then((res: any) => {
      this.data = res.data
    })
  }

  ngOnChanges(change: SimpleChanges) {
    if(!change['coin'].isFirstChange())
      this.update(change['coin'].currentValue)
  }
}
