import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginpageGuard: CanActivateFn = (route, state) => {
  console.log('loginpageGuard');
  if (sessionStorage.getItem('email') || localStorage.getItem('email')) {
    const router = inject(Router);
    console.log('loginpageGuard: redirect to /home');
    return router.navigate(['/home']);
  } else {
    console.log('loginpageGuard: allow access to /auth');
    return true;
  }
};
