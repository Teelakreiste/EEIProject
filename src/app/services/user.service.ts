import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendPasswordResetEmail, sendEmailVerification, updatePassword, updateEmail } from '@angular/fire/auth';

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

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  changePassword(newPassword: string) {
    return updatePassword(this.auth.currentUser, newPassword);
  }

  changeEmail(newEmail: string) {
    return updateEmail(this.auth.currentUser, newEmail);
  }
}
