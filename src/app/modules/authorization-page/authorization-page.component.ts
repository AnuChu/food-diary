import {Component} from '@angular/core';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.sass']
})
export class AuthorizationPageComponent {
  signIn: boolean = true

  handleSignIn($event: boolean) {
    this.signIn = $event
  }
}
