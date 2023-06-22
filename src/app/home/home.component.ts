import { Component } from '@angular/core';
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any = []
  constructor(private apiData: ApiDataService) {
    this.apiData.getCoinsList().subscribe(coinData => {
      this.data = coinData
    })
  }
}
