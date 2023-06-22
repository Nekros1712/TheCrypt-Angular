import { Component } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  constructor(private authService: SocialAuthService) {}
  currentUser: string = ""

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.currentUser = user.name
    })
  }
}
