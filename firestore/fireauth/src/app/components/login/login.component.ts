import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(
      {
        next: (u) => {
          this.notificationService.notificationHandler('Logged in successfully. Welcome '+u?.firstname+'!');
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        error: (e) => {
          this.notificationService.notificationHandler(e);
          this.loading = false;
        }
      }
    );

  }

  async loginGoogle(){
    (await this.authService
      .loginGoogle())
    .subscribe({
      next: (u)=>{
        this.notificationService.notificationHandler('Logged in successfully. Welcome '+u?.firstname+'!');
        this.router.navigateByUrl('/');
        this.loading = false;
      },
      error: (e) => {
        this.notificationService.notificationHandler(e);
        this.loading = false;
      }
    });
  }

}
