import { Component } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login'
import { ApiDataService } from '../api-data.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  currentUser: string = ""
  data: any = []
  coinA = { coin: 'Bitcoin', id: 'bitcoin' }
  
  constructor(private authService: SocialAuthService, private apiData: ApiDataService) {
    this.apiData.getCoinsList().then(coinData => {
      this.data = coinData
    })
  }
  
  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.currentUser = user.name
    })
  }
}
