import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/service/auth.service";
import {lifestyle} from "../../../shared/data/lifestyle";
import {purpose} from "../../../shared/data/purpose";
import {TuiFileLike} from "@taiga-ui/kit";
import {finalize, Observable, of, Subject, switchMap} from "rxjs";
import {UserForm} from "../../../shared/interface/user.form";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authorization-page.component.sass']
})
export class SignUpComponent {

  constructor(private authService: AuthService) {
  }

  lifestyleList = lifestyle
  purposeList = purpose
  items = [1, 2]
  send = false
  error = false
  textError = ''

  @Output() signUpSuccess = new EventEmitter<boolean>

  signUp = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    height: new FormControl(null, [Validators.required, Validators.min(100)]),
    weight: new FormControl(null, [Validators.required, Validators.min(25)]),
    age: new FormControl(null, [Validators.required, Validators.min(14)]),
    lifestyle: new FormControl(null, Validators.required),
    purpose: new FormControl(null, Validators.required),
    photo: new FormControl(null),
    gender: new FormControl(1, Validators.required),
  })

  get name() {
    return this.signUp.controls.name;
  }

  get email() {
    return this.signUp.controls.email;
  }

  get password() {
    return this.signUp.controls.password;
  }

  get height() {
    return this.signUp.controls.height;
  }

  get weight() {
    return this.signUp.controls.weight;
  }

  get age() {
    return this.signUp.controls.age;
  }

  get photo() {
    return this.signUp.controls.photo;
  }

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.signUp.controls.photo.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.signUp.controls.photo.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return of(file).pipe(
      finalize(() => this.loadingFiles$.next(null)),
    );
  }

  get lifestyle() {
    return this.signUp.controls.lifestyle;
  }

  get purpose() {
    return this.signUp.controls.purpose;
  }

  submit(): void {
    if (this.signUp.invalid) {
      this.signUp.markAllAsTouched()
      return;
    } else {
      const {email, password, ...userForm} = this.signUp.value
      const user: UserForm = {
        name: userForm.name || '',
        age: userForm.age || 0,
        height: userForm.height || 0,
        weight: userForm.weight || 0,
        photo: this.signUp.value.photo as unknown as File,
        gender: userForm.gender || 0,
        purpose: this.purposeList.indexOf(this.signUp.controls.purpose.value!),
        lifestyle: this.lifestyleList.indexOf(this.signUp.controls.lifestyle.value!)
      };

      this.authService.register(email!, password!, user)
        .then(() => {
          this.signUp.reset()
          this.send = true
          setTimeout(() => this.signUpSuccess.next(true), 3000)
          setTimeout(() => this.send = false, 3010)
        })
        .catch((err) => {
          if (err.message.includes('The email address is already in use')) {
            this.textError = '- Email адрес уже используется'
            this.error = true
            setTimeout(() => this.error = false, 3000)
            setTimeout(() => this.textError = '', 3000)
          }
          this.error = true
          setTimeout(() => this.error = false, 3000)
        })
    }
  }
}
