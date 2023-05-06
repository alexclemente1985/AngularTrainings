import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { isLoggedInSelector } from "../store/selectors/auth.selectors";

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
              select(isLoggedInSelector),
              tap(loggedIn => {
                  if (!loggedIn) {
                      this.router.navigateByUrl('/login');
                  }
              })
          )


  }
}
