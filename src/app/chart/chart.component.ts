import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiDataService } from '../api-data.service'
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  time: any = []
  price: any = []
  public chart: any

  @Input() coin = ''

  formatter(timestamp: string) {
    var date = new Date(timestamp).getDate()
    var month = new Date(timestamp).getMonth() + 1
    var hour = new Date(timestamp).getHours()
    return date + "/" + month + ": " + hour;
  }

  createChart() {
    this.chart = new Chart(this.coin, {
      type: 'line',
      data: {
        labels: this.time, 
	       datasets: [{
            label: this.coin,
            data: this.price,
            backgroundColor: '#03dac5',
            borderWidth: 1,
            borderColor: '#03dac9'
        }]
      }
    });
  }

  updateChart(newCoin: string) {
    let newLabels: any[] = []
    let newData: any[] = []
    this.apiData.getChart(newCoin.toLocaleLowerCase())
      .then(res => {
        res.data.prices.map((item: any) => {
            newLabels.push(this.formatter(item[0]))
            newData.push(item[1])
            return null
        })
        this.chart.data.labels = newLabels
        this.chart.data.datasets.forEach((dataset: any) => {
          dataset.data = newData
          dataset.label = newCoin
        })
        this.chart.update()
      })
  }

  constructor(private apiData: ApiDataService) {}

  ngOnInit() {
    this.apiData.getChart(this.coin.toLocaleLowerCase())
      .then(res => {
        res.data.prices.map((item: any) => {
            this.time.push(this.formatter(item[0]))
            this.price.push(item[1])
            return null
        })
        this.createChart()
      })
  }

  ngOnChanges(change: SimpleChanges) {
    if(!change['coin'].isFirstChange())
      this.updateChart(change['coin'].currentValue)
  }
}
