import { Injectable, NgZone } from '@angular/core';
import {User} from '../user';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //logged in user data
  userData: any;

  constructor(
    public afs: AngularFirestore,//firestore service
    public afAuth: AngularFireAuth,//firebase auth service
    public router: Router,
    public ngZone: NgZone /*ngzone to remove outside of scope warning*/) {
    //save user data when logged in, set to null otherwise
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
      else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  //sign in with email/password combo
  SignIn(email,password){
    return this.afAuth;//continue from here
  }
}
