import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'https://aqueous-atoll-87686.herokuapp.com/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        console.log(res);
        localStorage.setItem('current_user_name', res.username);
        localStorage.setItem('current_user_id', res.id);
        console.log(res.id);
        this.router.navigate(['lines']);
  });
  }

  currentUserName(): string {
      let currentUserName = localStorage.getItem('current_user_name');
      return (currentUserName? currentUserName : "undefined");
  }

  currentUserId(): string {
      let currentUserId = localStorage.getItem('current_user_id');
      return (currentUserId? currentUserId : "undefined");
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
