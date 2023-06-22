import { Component } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'TheCrypt'
  user: any
  loggedIn: boolean = false

  constructor(
    private router: Router,
    private authService: SocialAuthService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user
      this.loggedIn = !!user
    })
  }
  
  logout() {
    this.authService.signOut().then(res => {
      this.user = null
      this.loggedIn = false
      if(this.router.url === '/profile') this.router.navigate(['home'])
    })
  }
}
