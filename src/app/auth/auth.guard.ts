import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../shared/service/auth.service";


export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/authorization');
};