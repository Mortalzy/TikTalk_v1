import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from './auth.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/token/';

  token: string | null = null;
  refreshToken: string | null = null;


  login(payload: {username: string, password: string}):Observable<any> {
    const fd = new FormData();

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`,
    fd).pipe(
      tap(val => {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;
      }))
  }
}
