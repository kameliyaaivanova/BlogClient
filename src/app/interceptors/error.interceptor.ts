import { HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Utils } from '../utils';
import { StorageService } from '../service/storage.service';
import { inject } from '@angular/core';
import { Login } from '../model/Login';
import { UserService } from '../service/user.service';
import { LoginResponse } from '../model/LoginResponse';
import { JwtService } from '../service/jwt.service';
import { Token } from '../model/Token';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let liveRefreshToken = false;
  const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  const storageService = inject(StorageService)
  const userService = inject(UserService)
  const jwtService = inject(JwtService)
  const router = inject(Router)
  const jwtToken = storageService.getJwt()

  return next(req)
    .pipe(
        catchError((err) => {
          if (err.status !== 401 || Utils.getPathname(req.url) === 'login') {
            const error = err?.error?.message || err?.statusText;
            return throwError(error);
          }

          if (liveRefreshToken) {
            return refreshTokenSubject.pipe(
              filter(r => r != null),
              take(1),
              switchMap(() => next(Utils.attachToken(req, jwtToken!)))
            )
          } else {
            const payload = { refreshToken: storageService.getRefreshToken() } as Login

            liveRefreshToken = true;

            refreshTokenSubject.next(null);

            return userService.login(payload).pipe(
              switchMap((res: LoginResponse) => {
                const token = res.token
                const refreshToken = res.refreshToken

                const userToken = jwtService.decodeToken(token) as Token
                storageService.storeUser(userToken)

                storageService.storeJwt(token)
                storageService.storeRefreshToken(refreshToken)

                liveRefreshToken = false
                refreshTokenSubject.next(refreshToken)

                return next(Utils.attachToken(req, token!))
              }),
              catchError((err) => {
                liveRefreshToken = false

                userService.logout()

                router.navigate(['/login'])

                return throwError(err)
              })
            )
          }
        })
      )
};
