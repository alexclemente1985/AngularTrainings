import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import constants from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = constants.SERVER_BASE_URL + constants.routes.AUTH;
  private subjectUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private subjLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  register(user: User): Observable<User>{
    const postUrl = this.url + constants.auth_routes.REGISTER;
    return this.http.post<User>(postUrl, user);
  }

  login(credentials: {email: string, password: string} ): Observable<User>{
    const postUrl = this.url + constants.auth_routes.LOGIN;
    return this.http.post<User>(postUrl, credentials)
    .pipe(
      tap((u: User)=>{
        localStorage.setItem('token', u.token as string);
        this.subjLoggedIn$.next(true);
        this.subjectUser$.next(u);
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjectUser$.next(null);
  }

  isAuthenticated(): Observable<Boolean>{
    const token = localStorage.getItem('token');
    if(token && !this.subjLoggedIn$.value){
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<Boolean>{
    const getUrl = this.url + constants.routes.USER
    return this.http.get<User>(getUrl).
    pipe(
      tap((u: User) => {
        if(u){
          localStorage.setItem('token', u.token as string);
          this.subjLoggedIn$.next(true);
          this.subjectUser$.next(u);
        }
      }),
      map((u: User)=>(u) ? true : false),
      catchError((err)=>{
        this.logout();
        return of(false);
      })
    )
  }

  getUser(): Observable<User | null>{
    return this.subjectUser$.asObservable();
  }

  authInterceptorHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token');
      const authReq = req.clone({
        setHeaders: {
          Authorization: token as string
        }
      });
      return next.handle(authReq)
      .pipe(
        catchError((e)=>{
          console.log(e);
          if(e instanceof HttpErrorResponse){
            if(e.status === 401){
              this.logout();
              this.router.navigateByUrl(constants.routes.AUTH + constants.auth_routes.LOGIN);
            }
          }
          return throwError(()=>new Error(e))
        })
      );
    }
    return next.handle(req);
  }
}
