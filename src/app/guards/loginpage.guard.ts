import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginpageGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email') || localStorage.getItem('email')) {
    const router = inject(Router);
    return router.navigate(['/home']);
  } else {
    return true;
  }
};
