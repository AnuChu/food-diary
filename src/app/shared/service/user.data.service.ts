import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from "../interface/entity/user";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userDataSubject = new BehaviorSubject<IUser | undefined>(undefined);

  userData$ = this.userDataSubject.asObservable();

  setUserData(userData: IUser | undefined) {
    this.userDataSubject.next(userData);
  }

}
