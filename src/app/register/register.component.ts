import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = ""
  password: string = ""

  constructor(private router: Router, private authService: AuthService) {}

  addUser() {
    this.authService.register(this.username, this.password).subscribe(user => {
      this.router.navigate(['login'])
    })
  }
}
