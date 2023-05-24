import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, Observable} from "rxjs";
import {IUser, IUserWithoutId, IUserWithoutIdAndPhoto} from "../interface/entity/user";
import {UserForm} from "../interface/user.form";
import {FileUploadService} from "./file.upload.service";

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  constructor(private store: AngularFirestore, private fileUploadService: FileUploadService) {
  }

  getById(id: string): Observable<IUser> {
    return this.store.collection('users').doc(String(id)).valueChanges({idField: 'id'}) as unknown as Observable<IUser>
  }

  changeUser(id: string, user: IUserWithoutIdAndPhoto): Observable<void> {
    return from(this.store.collection('users').doc(id).update(user))
  }

  create(id: string, user: UserForm) {
    if (user.photo === null) {
      const {photo, ...u} = user
      const newUser: IUserWithoutId = {photo: null, ...u}
      this.store.collection('users').doc(id).set(newUser)
    } else {
      const fileName = this.fileUploadService.generateRandomName(user.photo!)
      this.fileUploadService.uploadImage(user.photo!, fileName).subscribe(res => {
        if (res == 100) {
          this.fileUploadService.getDownloadUrl(fileName).subscribe(downloadURL => {
            const {photo, ...u} = user
            const newUser: IUserWithoutId = {photo: downloadURL as string, ...u}
            return this.store.collection('users').doc(id).set(newUser)
          })
        }
      })
    }
  }

}
