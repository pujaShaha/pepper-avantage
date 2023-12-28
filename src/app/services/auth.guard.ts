import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // return true;
  if (
    sessionStorage.getItem('email') &&
    sessionStorage.getItem('password')
  ) {
    return true;
  } else {
    router.navigateByUrl('login');
    // this._utilityService.openSnackBar(
    //   'Please login to proceed further',
    //   'close'
    // );
    return false;
  }
};
