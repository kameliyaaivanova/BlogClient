import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { JwtService } from '../service/jwt.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.isAuthenticated()) {
        return true;
      }

      return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }

}
