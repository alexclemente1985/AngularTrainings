import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import firebaseApp from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth
  ) { }

  register(user: User){
    console.log('caindo aqui ', user)
    return from(this.afauth
    .createUserWithEmailAndPassword(user.email, user.password as string))
    .pipe(
      switchMap(
        async (u: firebase.default.auth.UserCredential) =>{
          console.log('u ', u)
          await this.userCollection.doc(u.user?.uid)
            .set({ ...user, id: u.user?.uid });
          return true;
          }),
          catchError((err)=> {
            console.log(err);
            return throwError(()=> new Error(err))}
        ))
  }

  login(email: string, password: string): Observable<User | undefined>{
    return from(this.afauth.signInWithEmailAndPassword(email,password))
    .pipe(
      switchMap(
        (u: firebase.default.auth.UserCredential)=>
        this.userCollection.doc(u.user?.uid)
        .valueChanges()),
      catchError(()=> throwError(()=> new Error('Invalid credentials or user is not registered.')))

    )
  }

  logout(){
    this.afauth.signOut();
  }

  getUser(): Observable<User | null | undefined>{
    return this.afauth.authState
    .pipe(
      switchMap(
        u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges()
        : of(null)
      )
    )
  }

  authenticated(): Observable<boolean>{
    return this.afauth.authState
    .pipe(
      map(
        u => (u) ? true : false
      )
    )
  }

  oldLoginGoogle(): Observable<User>{
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    return from(this.afauth.signInWithPopup(provider))
    .pipe(
      tap((data)=> console.log(data)),
      switchMap((u: firebase.default.auth.UserCredential)=> {
        const newUser: User = {
          firstname: u.user?.displayName as string,
          lastname: '',
          address: '',
          city: '',
          state: '',
          phone: '',
          mobilephone: '',
          email: u.user?.email as string,
          password: '',
          id: u.user?.uid as string
        };
        return this.userCollection.doc(u.user?.uid)
        .set(newUser)
        .then(()=>newUser)
      })
    );
  }

  async updateUserData(u: firebase.default.auth.UserCredential){
    try{
      const newUser: User = {
        firstname: u.user?.displayName as string,
        lastname: '',
        address: '',
        city: '',
        state: '',
        phone: '',
        mobilephone: '',
        email: u.user?.email as string,
        password: '',
        id: u.user?.uid as string
      };
      await this.userCollection.doc(u.user?.uid).set(newUser);
      return newUser;

    }
    catch(e){
      throw new Error(e as string);
    }
  }

  async loginWithGoogleAccount(){
    try{
      const provider = new firebaseApp.auth.GoogleAuthProvider();
      let credentials: firebase.default.auth.UserCredential
      = await this.afauth.signInWithPopup(provider);

      let user: User = await this.updateUserData(credentials)
      return user;
    }
    catch(e){
      throw new Error(e as string)
    }
  }

  async loginGoogle(): Promise<Observable<User>>{
    return from(this.loginWithGoogleAccount());
  }
}
