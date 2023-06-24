import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private coinA = new BehaviorSubject("Bitcoin")
  currentData = this.coinA.asObservable();

  constructor() { }

  setCoin(coin: string) {
    this.coinA.next(coin)
  }
}
