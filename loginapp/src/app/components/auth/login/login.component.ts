import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { AuthService, NotificationService } from 'src/app/services';
import constants from 'src/constants';

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
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    //private snackbar: MatSnackBar,
    private router: Router,
    private notificationService: NotificationService 
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    this.loading = true;
    this.authService.login(credentials)
    .subscribe({
      next: (u) => {
        console.log(u);
        this.notificationService.openSnackBar(constants.success_msgs.SUCCESS_LOGGED.replace('%s',u.firstname));
        this.router.navigateByUrl('/');
        this.loading = false;
      },
      error: (e) => {
        this.notificationService.openSnackBar(constants.error_msgs.auth.LOGIN + ': ' + e.error.message);
        this.loading = false;
      }
    }
    )

  }

  

}
