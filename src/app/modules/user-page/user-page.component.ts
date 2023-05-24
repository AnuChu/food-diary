import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRepository} from "../../shared/repository/user.repository";
import {lifestyle} from "../../shared/data/lifestyle";
import {purpose} from "../../shared/data/purpose";
import {AuthService} from "../../shared/service/auth.service";
import {IUserWithoutId, IUserWithoutIdAndPhoto} from "../../shared/interface/entity/user";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass']
})
export class UserPageComponent implements OnInit {

  send = false
  error = false

  lifestyleList = lifestyle
  purposeList = purpose
  items = [1, 2];
  userData: IUserWithoutId

  change = new FormGroup({
    name: new FormControl('', Validators.required),
    height: new FormControl(0, Validators.required),
    weight: new FormControl(0, Validators.required),
    age: new FormControl(0, Validators.required),
    lifestyle: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    gender: new FormControl(1, Validators.required),
  })

  constructor(private userService: UserRepository, private authService: AuthService) {
  }

  ngOnInit(): void {
    const userObservable = this.authService.getCurrentUser()
    userObservable.subscribe((value) => {
      this.userData = value
      this.change.setValue({
        name: this.userData.name,
        height: this.userData.height,
        weight: this.userData.weight,
        age: this.userData.age,
        lifestyle: this.lifestyleList[this.userData.lifestyle],
        purpose: this.purposeList[this.userData.purpose],
        gender: this.userData.gender,
      })
    })
  }


  get name() {
    return this.change.controls.name;
  }

  get height() {
    return this.change.controls.height;
  }

  get weight() {
    return this.change.controls.weight;
  }

  get age() {
    return this.change.controls.age;
  }

  get lifestyle() {
    return this.change.controls.lifestyle;
  }

  get purpose() {
    return this.change.controls.purpose;
  }

  submit(): void {
    const user: IUserWithoutIdAndPhoto = {
      name: this.change.controls.name.value || null,
      age: this.change.controls.age.value || null,
      height: this.change.controls.height.value || null,
      weight: this.change.controls.weight.value || null,
      gender: this.change.controls.gender.value || null,
      purpose: this.purposeList.indexOf(this.change.controls.purpose.value!),
      lifestyle: this.lifestyleList.indexOf(this.change.controls.lifestyle.value!)
    };
    const id = this.authService.getCurrentUserId()
    this.userService.changeUser(id, user)
      .subscribe({
        next: () => {
          this.send = true
          setTimeout(() => this.send = false, 3000)
        },
        error: () => {
          this.error = true
          setTimeout(() => this.error = false, 3000)
        }
      })
  }
}
