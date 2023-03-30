import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard {

  constructor(
    private store: Store<any>,
    private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {

      return this.store
          .pipe(
              /* select(isLoggedIn),
              tap(loggedIn => {
                  if (!loggedIn) {
                      this.router.navigateByUrl('/login');
                  }
              }) */
          )


  }
}
