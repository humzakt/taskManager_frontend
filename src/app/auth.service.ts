import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getNewAccessToken() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private webService: WebRequestService
  ) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: any) => {
        //the auth token will be in the header under the x-access-token key
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );

        console.log('Logged In');
        console.log(res);
      })
    );
  }

  logout() {
    this.removeSession();
  }

  private setSession(
    userId: string,
    accessToken: string,
    referenceToken: string
  ) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', referenceToken);
  }

  private removeSession() {
    localStorage.removeItem('userId');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }
}
