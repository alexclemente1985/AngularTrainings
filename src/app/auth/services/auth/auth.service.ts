import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {

  }

  login(email:string, password:string): Observable<IUser> {
      return this.http.post<IUser>('/api/login', {email,password});
  }
}
