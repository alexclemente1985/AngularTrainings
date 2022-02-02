import { Component, OnInit } from '@angular/core';
import {  AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/auth/user';
import { AuthService, NotificationService } from 'src/app/services';
import  AuthUtils  from 'src/app/utils/authUtils';
import constants from 'src/constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    firstname: ['',[Validators.required]],
    lastname: ['',[Validators.required]],
    address: ['',[Validators.required]],
    city: ['',[Validators.required]],
    state: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    mobilephone: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password1: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required, Validators.minLength(6)]],
  },{validator: AuthUtils.validatePassword} as AbstractControlOptions)

  states = ["MG", "RS", "SC", "GO", "PR", "SP", "RJ"];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notificationService: NotificationService 
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.formRegister.value)
    let u: User = {
      ...this.formRegister.value, 
      password: this.formRegister.value.password1
    }
    this.authService.register(u)
    .subscribe(
      {
        next: () => {
         this.notificationService.openSnackBar(constants.success_msgs.SUCCESS_REGISTER);
          const loginUrl = constants.routes.AUTH + constants.auth_routes.LOGIN
          this.router.navigateByUrl(loginUrl);
        },
        error: (e) => this.notificationService.openSnackBar(constants.error_msgs.auth.REGISTER + ' ' + e.error.message)
      }
    );
  }

}
