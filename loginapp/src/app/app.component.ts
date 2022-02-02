import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import constants from 'src/constants';
import { User } from './models/auth/user';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loginapp';

  authenticated$!: Observable<Boolean>;
  user$!: Observable<User | null>

  constructor(
    private authService: AuthService,
    private router: Router
    ){
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl(constants.routes.AUTH + constants.auth_routes.LOGIN);
  }
}
