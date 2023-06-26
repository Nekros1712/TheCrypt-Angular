import { Component } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {
  coinA = 'Bitcoin'
  dropDownOptsA = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  updateCoinAData = (newCoin: string): string => this.coinA = newCoin

  coinB = 'Ethereum'
  dropDownOptsB = ['Bitcoin', 'Ethereum', 'Tether', 'Solana']
  updateCoinBData = (newCoin: string): string => this.coinB = newCoin
}
