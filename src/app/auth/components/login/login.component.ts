import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { loadAllCourses } from 'src/app/courses/store/actions/courses.actions';
import { AppState } from 'src/app/store/reducers';
import { AuthService } from '../../services/auth/auth.service';
import { login } from '../../store/actions/auth-actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ){
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    })
  }
  ngOnInit(): void {
  }

  login(){
    const { value } = this.form;

    this.authService
    .login(value.email, value.password)
      .pipe(
        tap(user => {
          this.store.dispatch(login({user}));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe({
        next: () => alert('Login failed')}
      )
  }
}
