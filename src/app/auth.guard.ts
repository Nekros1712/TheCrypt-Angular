import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state): boolean => {
  let isLoggedIn = inject(AuthService).isAuthenticated()
  let router = inject(Router)
  if(isLoggedIn) return true
  else {
    router.navigate(['login'])
    return false
  }
};
