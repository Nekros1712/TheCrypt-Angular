import { Component, Input, SimpleChanges } from '@angular/core'
import { ApiDataService } from '../api-data.service'
import { Chart } from 'chart.js/auto'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: any
  private isProfile: boolean = false
  
  @Input() data = { coin: '', id: '' }
  
  public contextId: string = this.data.coin
  
  createChart(chartData: any) {
    return new Chart(chartData.name, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: chartData.name,
          data: chartData.data,
          backgroundColor: '#03dac5',
          borderWidth: 1,
          borderColor: '#03dac9'
        }]
      }
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

  constructor(private apiData: ApiDataService, private auth: AuthService, private router: Router) {
    this.isProfile = this.router.url === '/profile'
  }

  ngOnInit() {
    if (this.isProfile) {
      this.contextId = 'investment'
      let token = this.auth.getToken()
      this.apiData.getInvestmentChart(token).then((res: any) => {
        this.chart = this.createChart({
          name: 'investment',
          labels: res.data.time,
          data: res.data.investmentValue
        })
      })
      
    } else {
      this.contextId = this.data.coin
      this.apiData.getChartData(this.data.id).then((res: any) => {
        this.chart = this.createChart({
          name: this.data.coin,
          labels: res.time,
          data: res.price
        })
      })
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (!change['data'].isFirstChange())
      this.update(change['data'].currentValue)
  }
}
