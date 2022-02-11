import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  states = ['MG','RS','SC','SP','RJ','MA'];

  formRegister: FormGroup = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    address: ['', []],
    city: ['', []],
    state: ['', []],
    phone: ['', []],
    mobilephone: ['', []],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required, Validators.minLength(0)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },
  {validator: this.matchingPasswords})



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup){
    if(group){
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;

      if(password1 == password2){
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit(){
    const newUser: User = {
      firstname: this.formRegister.value.firstname,
      lastname: this.formRegister.value.lastname,
      address: this.formRegister.value.address,
      city: this.formRegister.value.city,
      state: this.formRegister.value.state,
      phone: this.formRegister.value.phone,
      mobilephone: this.formRegister.value.mobilephone,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password1,
    };

    this.authService.register(newUser)
    .subscribe(
      {
        next : (u) => {
          this.notificationService
          .notificationHandler('Successfully registered. Use your new credentials to sign in.');

          this.router.navigateByUrl('/auth/login');
          },
        error: (e) => this.notificationService
        .notificationHandler('Error. You are not registered.')
      }
    );
  }

}
