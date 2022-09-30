import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendPasswordResetEmail, sendEmailVerification } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  email: string;
  password: string;


  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login({email, password}: any) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.auth.signOut();
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  verifyEmail() {
    return sendEmailVerification(this.auth.currentUser);
  }
}
