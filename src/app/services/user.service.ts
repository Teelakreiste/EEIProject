import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendPasswordResetEmail, sendEmailVerification, fetchSignInMethodsForEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

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

  isLoggedIn(): boolean {
    const user = this.auth.currentUser;
    return (user !== null) ? true : false;
  }
  
  getUID(): string {
    return this.auth.currentUser.uid;
  }

  getUserByEmail(email: string) {
    return fetchSignInMethodsForEmail(this.auth, email);
  }
  
  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async checkEmailExist(email: string) {
    const res = await this.getUserByEmail(email);
    if (res != null) {
      return true;
    }
    return false;
  }
}
