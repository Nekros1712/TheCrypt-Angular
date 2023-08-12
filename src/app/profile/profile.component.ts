import { Component } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login'
import { ApiDataService } from '../api-data.service'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  currentUser: string = ""
  token: string = ""
  data: any = []
  bagData: any = {}
  gainLoss: any = 0
  coinA = { coin: 'Bitcoin', id: 'bitcoin' }
  
  constructor(
    private auth: AuthService,
    private apiData: ApiDataService,
    private authService: SocialAuthService
  ) {
    this.token = this.auth.getToken()
    this.apiData.getCoinsList().then(coinData => {
      this.data = coinData
    })
    // this.apiData.getInvestmentsList(this.token).then(coinData => {
    //   this.data = coinData
    // })
    this.apiData.getBagData(this.token).then((res: any) => {
      this.bagData = res.data
      this.gainLoss = ((this.bagData.currentValue - this.bagData.investedValue) / this.bagData.investedValue) * 100
    })
  }
  
  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.currentUser = user.name
    })
  }
}
