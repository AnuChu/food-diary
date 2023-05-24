import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";
import {IUser} from "../../shared/interface/entity/user";
import {UserDataService} from "../../shared/service/user.data.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.sass']
})

export class HeaderComponent implements OnInit {

  user: IUser | undefined

  constructor(private authService: AuthService, private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    this.userDataService.userData$.subscribe(userData => {
      this.user = userData;
    });

    if (this.authService.isLoggedIn()) {
      firstValueFrom(this.authService.getCurrentUser()).then(value => {
        this.userDataService.setUserData(value);
      });
    }
  }

  logout() {
    this.authService.logout()
    this.userDataService.setUserData(undefined)
  }

  protected readonly userIcon = "../../../assets/images/icon/user.svg";
}
