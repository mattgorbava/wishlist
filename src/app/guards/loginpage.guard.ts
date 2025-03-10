import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs';

export const loginpageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const email = sessionStorage.getItem('email') || localStorage.getItem('email');
  
  if (!email) {
    return true;
  }
  
  return authService.getUserByEmail(email).pipe(
    map(users => {
      if (users && users.length > 0) {
        router.navigate(['/home']);
        return false; 
      } else {
        sessionStorage.removeItem('email');
        localStorage.removeItem('email');
        return true; 
      }
    })
  );
};
