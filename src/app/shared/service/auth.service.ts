import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {UserRepository} from "../repository/user.repository";
import {UserForm} from "../interface/user.form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private userRepository: UserRepository) {
  }

  login(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
        localStorage.setItem('token', res.user?.uid!);
        this.router.navigate(['/diary']);
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null
  }

  register(email: string, password: string, user: UserForm) {
    return new Promise<void>((resolve, reject) => {
      this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
        this.userRepository.create(res.user?.uid!, user)
        this.router.navigate(['/authorization']);
        resolve()
      }, err => {
        reject(err)
      })
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/authorization']);
    }, err => {
      alert(err.message);
    })
  }

  getCurrentUserId() {
    return localStorage.getItem('token')!
  }

  getCurrentUser() {
    return this.userRepository.getById(this.getCurrentUserId())
  }


}

