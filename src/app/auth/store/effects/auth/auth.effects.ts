import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance/persistance.service';
import { login, logout } from '../../actions/auth-actions';



@Injectable()
export class AuthEffects {


  constructor(
    private actions$: Actions,
    private persistanceService: PersistanceService,
    private router: Router
    ) {}

  login$ = createEffect(()=> 
    this.actions$
      .pipe(
        ofType(login),
        tap(action => this.persistanceService.set('user', action.user))
      ),
      {dispatch: false}
  );

  logout$ = createEffect(()=> 
      this.actions$
        .pipe(
          ofType(logout),
          tap(action => {
            this.persistanceService.remove('user');
            this.router.navigateByUrl('/login')
          })
        ),
        {dispatch: false}
    )
}
