import { Injectable } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = ''
  
  constructor(
    private authService: SocialAuthService
  ) {}

  getToken() { return this.token }
  setToken(newToken: string) { this.token = newToken }
  
  isAuthenticated() {
    let loggedIn = false
    this.authService.authState.subscribe(user => {
      loggedIn = !!user
    })
    return loggedIn
  }
}
