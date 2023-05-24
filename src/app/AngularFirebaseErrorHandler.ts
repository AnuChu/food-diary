import { ErrorHandler, Injectable } from "@angular/core";
import { FirebaseError } from "firebase/app";

interface AngularFireError extends Error {
  rejection: FirebaseError;
}

function errorIsAngularFireError(err: any): err is AngularFireError {
  return err.rejection && err.rejection.name === 'FirebaseError';
}

@Injectable()
export class AngularFirebaseErrorHandler implements ErrorHandler {
  handleError(error: any) {
    if (!errorIsAngularFireError(error)) {
      console.error(error);
    }
  }
}
