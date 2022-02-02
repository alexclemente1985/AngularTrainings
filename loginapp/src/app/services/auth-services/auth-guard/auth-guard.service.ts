import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import constants from 'src/constants';
import { AuthService } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return (this.authService.isAuthenticated() as Observable<boolean>)
      .pipe(
        tap((b)=>{
          if(!b){
            this.router.navigateByUrl(constants.routes.AUTH + constants.auth_routes.LOGIN);
          }
        })
      );
  }
}
