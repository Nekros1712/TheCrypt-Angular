import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-coindata',
  templateUrl: './coindata.component.html',
  styleUrls: ['./coindata.component.css']
})
export class CoindataComponent {
  @Input() data = { coin: '', id: '' }

  coinData = {
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

  update(data: any) {
    this.data = data
    this.apiService.getCoinData(data.id).then((res: any) => {
      this.coinData = res.data
    })
  }

  ngOnInit() {
    this.apiService.getCoinData(this.data.id).then((res: any) => {
      this.coinData = res.data
    })
  }

  ngOnChanges(change: SimpleChanges) {
    if(!change['data'].isFirstChange())
      this.update(change['data'].currentValue)
  }
}
