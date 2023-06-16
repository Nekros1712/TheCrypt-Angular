import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = 'http://localhost:3000'
  
  constructor(private http: HttpClient, private router: Router) { }
  
  isAuthenticated() {
    return localStorage.getItem('username') ? true : false
  }

  login(username: string, password: string) {
    return this.http.get<any>(`${this.apiURI}/data?username=${username}&password=${password}`)
  }

  register(username: string, password: string) {
    return this.http.post<any>(`${this.apiURI}/data`, { username, password })
  }

  logout() {
    localStorage.removeItem('username')
    this.router.navigate(['login'])
  }
}
