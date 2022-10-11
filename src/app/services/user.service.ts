import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendPasswordResetEmail, sendEmailVerification, updatePassword, updateEmail } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;
  userStatus: string = '';

  constructor(private auth: Auth, 
    private angularFirestore: AngularFirestore,
    private localService: LocalService) { }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password).
      then((userCredential) => {
        this.createUser(userCredential);
    }).finally(() => {
      this.logout();
    });
  }

  createUser(userCredential: any) {
    let user = {
      id: userCredential.user.uid,
      email: userCredential.user.email,
      role: "user"
    }

    this.angularFirestore.collection('users').add(user).then(user => {
      user.get().then(x => {
        // console.log(x.data());
        this.currentUser = x.data();
        this.setUserStatus(this.currentUser);
      });
    });
  }

  async login({email, password}: any) {
    return await signInWithEmailAndPassword(this.auth, email, password).
    then((user) => {
      this.getUser(user);
    });
  }

  getUser(user: any) {
    this.angularFirestore.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap => {
      snap.forEach(userRef => {
        // console.log("userRef",userRef.data());
        this.currentUser = userRef.data();
        this.setUserStatus(this.currentUser.role);
      });
    });
  }

  setUserStatus(role: string) {
    this.userStatus = role;
    this.localService.setJsonValue('role', this.userStatus);
    // console.log("userStatus", this.userStatus);
  }

  logout() {
    return this.auth.signOut().then(() => {
    }).catch((error) => {
      window.alert(error);
      console.log(error);
    }).finally(() => {
      this.localService.clearToken();
      this.localService.clearSToken();
      this.userStatus = '';
      this.currentUser = null;
    });
  }

  verifyEmail() {
    return sendEmailVerification(this.auth.currentUser);
  }

  isLoggedIn(): boolean {
    const user = this.auth.currentUser;
    return (user !== null) ? true : false;
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
