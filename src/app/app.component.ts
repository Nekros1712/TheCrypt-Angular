import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'TheCrypt'
  constructor(public auth: AuthService) {}
  
  logout() {
    this.auth.logout()
  }
}
