import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/service/auth.service";
import {firstValueFrom} from "rxjs";
import {UserDataService} from "../../../shared/service/user.data.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authorization-page.component.sass']
})
export class SignInComponent {

  constructor(private auth: AuthService, private userDataService: UserDataService) {
  }

  error: boolean = false


  signIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  get email() {
    return this.signIn.controls.email;
  }

  get password() {
    return this.signIn.controls.password;
  }

  submit(): void {
    if (this.signIn.invalid) {
      this.signIn.markAllAsTouched();
      return;
    } else {
      this.auth.login(this.signIn.controls.email.value!, this.signIn.controls.password.value!)
        .then(() => {
          firstValueFrom(this.auth.getCurrentUser())
            .then(value => {
              this.userDataService.setUserData(value);
            })
            .catch(err => {
              this.error = true;
              setTimeout(() => (this.error = false), 2000);
            });
        })
        .catch(err => {
          this.error = true;
          setTimeout(() => (this.error = false), 2000);
        });
    }
  }
}
