import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private store: AngularFirestore, private storage: AngularFireStorage) {
  }

  generateRandomName(file: File): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let randomName = '';

    for (let i = 0; i < length; i++) {
      randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${randomName}_${file.name}`;
  }

  uploadImage(file: File, fileName: string) {
    const filePath = `images/${fileName}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, file);
    return uploadTask.percentageChanges()
  }

  getDownloadUrl(fileName: string) {
    const filePath = `images/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL()
  }
}
