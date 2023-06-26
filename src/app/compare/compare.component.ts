import { Component } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {
  dropDownOpts = {
    'Bitcoin': 'bitcoin',
    'Ethereum': 'ethereum',
    'Tether': 'tether',
    'Solana': 'solana',
    'USD Coin': 'usd-coin'
  }
  
  coinA = { coin: 'Bitcoin', id: 'bitcoin' }
  updateCoinA = (data: any) => this.coinA = { coin: data.coin, id: data.id }

  coinB = { coin: 'Ethereum', id: 'ethereum' }
  updateCoinB = (data: any) => this.coinB = { coin: data.coin, id: data.id }
}
