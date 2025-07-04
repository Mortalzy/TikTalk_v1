import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.inteface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  cookieService = inject(CookieService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;
  router = inject(Router)

  get isAuth() {
    if(!this.token){
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }


  login(payload: {username: string, password: string}):Observable<any> {
    const fd = new FormData();

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`,
    fd).pipe(
      tap(val => this.saveTokens(val)))
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`,
      {refreshToken: this.refreshToken, 
      }
    ).pipe(
      tap(res => {

      }),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}
