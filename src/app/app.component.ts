import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from './auth/store/actions/auth-actions';
import { isLoggedInSelector, isLoggedOutSelector } from './auth/store/selectors/auth.selectors';
import { PersistanceService } from './shared/services/persistance/persistance.service';
import { AppState } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loading: boolean = true;
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  
  title = 'ngrx-courses';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private persistanceService: PersistanceService
  ){}

  ngOnInit(): void {
    const userProfile = this.persistanceService.get('user');

    if(userProfile){
      this.store.dispatch(login({user: JSON.parse(userProfile)}));
    }

    this.router.events.subscribe(
      event => {
        switch(true){
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }
          case event instanceof NavigationEnd: 
          case event instanceof NavigationCancel:
          case event instanceof NavigationError:
          {
            this.loading = false;
            break;
          }
          default:
            break;
        }
      }
    );

    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedInSelector)
      );
    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOutSelector)
      );
  }

  logout() {
    this.store.dispatch(logout());
  }
}
