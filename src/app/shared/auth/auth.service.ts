import { Injectable, NgZone } from '@angular/core';
import { User } from '../user';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';

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
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPAssword(email, password).
      then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  //sign up email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email.password).
      then((result) => {
        //call sendverificationmail and returns a promise
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification.
      then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).
      then(() => {
        window.alert('Password reset email has been sent. Check your mail');
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      roles: user.Roles
    }
    return userRef.set(userData, { merge: true })
  }

  //sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signIn']);
    })
  }

}
