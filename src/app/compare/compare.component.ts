import { Component } from '@angular/core';
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {
  
  dropDownOpts = { 'Bitcoin': 'bitcoin', 'Ethereum': 'ethereum', 'Tether': 'tether' }
  
  coinA = { coin: 'Bitcoin', id: 'bitcoin' }
  updateCoinA = (data: any) => this.coinA = { coin: data.coin, id: data.id }

  coinB = { coin: 'Ethereum', id: 'ethereum' }
  updateCoinB = (data: any) => this.coinB = { coin: data.coin, id: data.id }

  constructor(private apiService: ApiDataService) {
    apiService.getDropdownList()
  }

  ngOnInit() {
    this.dropDownOpts = this.apiService.dropdownData
  }
}
