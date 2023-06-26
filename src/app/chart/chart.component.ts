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

  @Input() data = { coin: '', id: '' }

  create() {
    this.apiData.getChartData(this.data.id).then((res: any) => {
      this.chart = new Chart(this.data.coin, {
        type: 'line',
        data: {
          labels: res.time, 
           datasets: [{
              label: this.data.coin,
              data: res.price,
              backgroundColor: '#03dac5',
              borderWidth: 1,
              borderColor: '#03dac9'
          }]
        }
      })
    })
  }

  update(data: any) {
    this.apiData.getChartData(data.id).then((res: any) => {
      this.chart.data.labels = res.time
      this.chart.data.datasets.forEach((dataset: any) => {
        dataset.data = res.price
        dataset.label = data.coin
      })
      this.chart.update()
    })
  }

  constructor(private apiData: ApiDataService) {}

  ngOnInit() {
    this.create()
  }

  ngOnChanges(change: SimpleChanges) {
    if(!change['data'].isFirstChange())
      this.update(change['data'].currentValue)
  }
}
