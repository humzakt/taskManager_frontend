import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
        // console.log(res);
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );

        console.log('Logged In');
        // console.log(res);
      })
    );
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: any) => {
        //the auth token will be in the header under the x-access-token key
        console.log(res);
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
    this.router.navigate(['/login']);
  }

  private setSession(
    userId: string,
    accessToken: string,
    referenceToken: string
  ) {
    // console.log(userId);
    // console.log(referenceToken);
    // console.log(accessToken);

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

  getRefreshToken(): string {
    return localStorage.getItem('x-refresh-token')!;
  }
  getUserId(): string {
    return localStorage.getItem('userId')!;
  }

  getNewAccessToken() {
    try {
      return this.http
        .get(`${this.webService.ROOT_URL}/users/me/access-token`, {
          headers: {
            'x-refresh-token': this.getRefreshToken(),
            _id: this.getUserId(),
          },
          observe: 'response',
        })
        .pipe(
          tap((res: any) => {
            this.setAccessToken(res.headers.get('x-access-token'));
          })
        );
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
