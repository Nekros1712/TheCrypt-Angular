import { Injectable } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:3000'
  
  constructor(
    private authService: SocialAuthService
  ) {}
  
  isAuthenticated() {
    let loggedIn = false
    this.authService.authState.subscribe(user => {
      loggedIn = !!user
    })
    return loggedIn
  }
}
