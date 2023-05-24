import {Component} from '@angular/core';
import {IUser} from "../../../shared/interface/entity/user";
import {UserRepository} from "../../../shared/repository/user.repository";
import {AuthService} from "../../../shared/service/auth.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-diary-user',
  templateUrl: './diary-user.component.html',
  styleUrls: ['./diary-user.component.sass']
})
export class DiaryUserComponent {

  dataUser: Promise<IUser> = firstValueFrom(this.userService.getById(this.authService.getCurrentUserId()))

  constructor(private userService: UserRepository, private authService: AuthService) {
  }

}
