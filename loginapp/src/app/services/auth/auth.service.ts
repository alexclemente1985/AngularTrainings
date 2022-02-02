import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import constants from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = constants.SERVER_BASE_URL + constants.routes.AUTH;
  private subjectUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private subjLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    console.log('user registering: ', user)
    const postUrl = this.url + constants.auth_routes.REGISTER;
    return this.http.post<User>(postUrl, user);
  }

  login(credentials: {email: string, password: string} ): Observable<User>{
    const postUrl = this.url + constants.auth_routes.LOGIN;
    return this.http.post<User>(postUrl, credentials)
    .pipe(
      tap((u: User)=>{
        localStorage.setItem('token', u.token as string);
        this.subjectUser$.next(u);
      })
    );
  }

  isAuthenticated(): Observable<Boolean>{
    return this.subjLoggedIn$.asObservable();
  }

  getUser(): Observable<User | null>{
    return this.subjectUser$.asObservable();
  }
}
