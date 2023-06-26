import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiDataService } from '../api-data.service'
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: any

  @Input() coin = ''

  create() {
    this.apiData.getData(this.coin).then((res: any) => {
      this.chart = new Chart(this.coin, {
        type: 'line',
        data: {
          labels: res.time, 
           datasets: [{
              label: this.coin,
              data: res.price,
              backgroundColor: '#03dac5',
              borderWidth: 1,
              borderColor: '#03dac9'
          }]
        }
      })
    })
  }

  update(newCoin: string) {
    this.apiData.getData(newCoin).then((res: any) => {
      this.chart.data.labels = res.time
      this.chart.data.datasets.forEach((dataset: any) => {
        dataset.data = res.price
        dataset.label = newCoin
      })
      this.chart.update()
    })
  }

  constructor(private apiData: ApiDataService) {}

  ngOnInit() {
    this.create()
  }

  ngOnChanges(change: SimpleChanges) {
    if(!change['coin'].isFirstChange())
      this.update(change['coin'].currentValue)
  }
}
