import { Component, Input, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  public chart: any;
  @Input() data = { coin: '', id: '' };
  @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;

  constructor(private apiData: ApiDataService) {}

  ngAfterViewInit() {
    this.create();
  }

  ngOnChanges(change: SimpleChanges) {
    if (!change['data'].isFirstChange()) {
      this.update(change['data'].currentValue);
    }
  }

  create() {
    const cachedData = localStorage.getItem(this.data.coin);
    if (cachedData) {
      const chartData = JSON.parse(cachedData);
      this.chart = new Chart(this.chartCanvas!!.nativeElement.getContext('2d'), {
        type: 'line',
        data: {
          labels: chartData.time,
          datasets: [{
            label: this.data.coin,
            data: chartData.price,
            backgroundColor: '#03dac5',
            borderWidth: 1,
            borderColor: '#03dac9'
          }]
        }
      });
    } else {
      this.apiData.getChartData(this.data.id).then((res: any) => {
        localStorage.setItem(this.data.coin, JSON.stringify(res));
        this.chart = new Chart(this.chartCanvas!!.nativeElement.getContext('2d'), {
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
        });
      });
    }
  }

  update(data: any) {
    const cachedData = localStorage.getItem(data.coin);
    if (cachedData) {
      const chartData = JSON.parse(cachedData);
      this.chart.data.labels = chartData.time;
      this.chart.data.datasets.forEach((dataset: any) => {
        dataset.data = chartData.price;
        dataset.label = data.coin;
      });
      this.chart.update();
    } else {
      this.apiData.getChartData(data.id).then((res: any) => {
        localStorage.setItem(data.coin, JSON.stringify(res));
        this.chart.data.labels = res.time;
        this.chart.data.datasets.forEach((dataset: any) => {
          dataset.data = res.price;
          dataset.label = data.coin;
        });
        this.chart.update();
      });
    }
  }
}
