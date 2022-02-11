import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fireauth';

  user$!: Observable<User>;
  authenticated$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.user$ = this.authService.getUser() as Observable<User>;
    this.authenticated$ = this.authService.authenticated()
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
