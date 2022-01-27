import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { USER_STORAGE_KEY } from 'src/app/shared/navbar/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem(USER_STORAGE_KEY)) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
