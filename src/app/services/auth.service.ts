import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  userSubjects = new Subject<any>();

  constructor(
    public authFire: AngularFireAuth,
    public router: Router,
    public firestore: AngularFirestore) {
      
    this.authFire.authState.subscribe((user) => {
      console.log('userData: ', JSON.stringify(user));
      if (user) {
        this.userData = user;
        this.userSubjects.next(this.userData);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.userSubjects.next(null);
        localStorage.removeItem('user');
      }
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(JSON.stringify(result));
        this.storeUserData(result.user);
        this.router.navigate(['/']);
      });
  }

  registerUser(email: string, password: string) {
    return this.authFire.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.storeUserData(result.user);
        this.sendVerificationEmail();
        this.router.navigate(['/verify-user']);
      });
  }

  storeUserData(user: any) {
    this.firestore
      .collection('users')
      .doc(user.uid)
      .set({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      })
      .then((result) => {
        console.log(JSON.stringify(result));
      })
  }

  sendVerificationEmail() {
    return this.authFire.currentUser.then((u: any) => {
      u.sendEmailVerification();
    })
  }

  get userInfo(): any{
    return this.userData;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    /*
    if (user !==null && user.emailVerified !== false) {
      return true;
    } else {
      return false;
    }
    */
    return user !== null && user.emailVerified !== false ? true : false;
  }

  forgotPassword(emailResetEmail: string){
    return this.authFire.sendPasswordResetEmail(emailResetEmail)
      .then(() => {
        //Se ejecute correctamente el proceso de envío de correo de reseteo
        
      }).catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.authFire.signOut().then(() => {
      localStorage.removeITem('user');
      this.router.navigate(['/login']);
    });
  }

  

}