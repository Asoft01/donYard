import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { StorageKeys } from 'src/app/models/storage-key-constants'
import * as shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //hash: any;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  login(username: string): Observable<any> {
    // this.hash = shajs('sha256').update('devyardteam@donyard').digest('hex');
    const url: string = environment.apiBaseUrl + '/login/username';

    const request = {
      username
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.post<any>(url, request, httpOptions).pipe(catchError(this.handleGetTokenError));
  }

  verifyEmailOrMobile(emailOrMobile: string): Observable<any> {
    const url: string = environment.apiBaseUrl + '/register/verifyemail';

    const request = {
      email: emailOrMobile
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: StorageKeys.AUTHORIZATION_HEADER
      })
    };

    return this.http.post<any>(url, request, httpOptions).pipe(catchError(this.handleGetTokenError));
  }

  logOut(): void {
    this.localStorageService.setItem('isLoggedIn', 'false');
    this.localStorageService.removeItem('token');
  }

//   initiateSession(loginObject: any): void {
//     if (!loginObject) {
//         return;
//     }

//     const accessToken = loginObject.accessToken;
//     const expires = loginObject.expires;
//     const expiresTime = new Date(expires);
//     const currentTime = new Date();

//     const diffInMilli = expiresTime.getTime() - currentTime.getTime();
//     const diffInMinutes = diffInMilli / (60 * 1000);

//     this.storageService.set(StorageKeys.ACCESS_TOKEN, accessToken, diffInMinutes);
//     this.initiateTokenMonitor(diffInMilli);

//     this.browserHelper.gotoDashboard();
// }

  private handleGetTokenError(error: HttpErrorResponse): any {
    let errorMessage = 'Could not complete your request. Please try again!';
    if (error == null) {
      return of({ message: errorMessage });
    }

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error occurred! Could not connect to server. Please try again.';
      return of({ message: errorMessage });
    }

    if (error.status === 0) {
      errorMessage = 'Could not connect to server. Please check your connection and try again.';
      return of({ message: errorMessage });
    }

    if(error.error.message) {
      errorMessage = 'Error: '+ error.error.message;
      return of({ message: errorMessage });
    }

    errorMessage = 'Could not confirm your login details. Please try again.';
    return of({ message: errorMessage });
  }

}
