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

 /*  AuthUtils(group: FormGroup){
    if(group){
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if(password1 === password2){
        return null;
      }
    }
    return {matching: false}
  } */

  /* snackBarHandler(msg: string){
    this.snackBar.open(
      msg,
      'OK',
      {duration: 2000}
      )
  } */

  

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
          //this.snackBarHandler(constants.success_msgs.SUCCESS_REGISTER);
          this.notificationService.openSnackBar(constants.success_msgs.SUCCESS_REGISTER);
          const loginUrl = constants.routes.AUTH + constants.auth_routes.LOGIN
          this.router.navigateByUrl(loginUrl);
        },
        error: (e) => this.notificationService.openSnackBar(constants.error_msgs.auth.REGISTER + ' ' + e.message)//this.snackBarHandler(e.error.message)
      }
      /* (u)=>{
        this.snackBar.open(
          'Successfully registered. Use your credentials to log in',
          'OK',
          {duration: 2000}
          )
      },
      (err)=>{
        this.snackBar.open(
          'Successfully registered. Use your credentials to log in',
          'OK',
          {duration: 2000}
          )
      } */
    );
  }

}
