import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/";
import { DatabaseService } from "../database/database.service";
import { ToastController, MenuController, Platform } from "@ionic/angular";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { switchMap } from "rxjs/operators";
import { IUser } from "../../interfaces/user-interface";
import { AngularFirestore } from "@angular/fire/firestore";
import { SpotifyService } from "../spotify/spotify.service";
@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  private user: Observable<IUser>;
  loggedInStatus: boolean = false;

  constructor(
    private _afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private dbService: DatabaseService,
    private toastCtrl: ToastController,
    private spotifyService: SpotifyService
  ) {

  }

  stayLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.router.navigate([""]);
      } else {
        this.router.navigate(["login"]);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  signUp(email: string, password: string, displayName: string) {
    this._afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {

        let user: IUser = {
          uid: res.user.uid,
          email: email,
          displayName: displayName
        };

        this.dbService.addUser(user);

        this.sendEmailVerification();
        this.presentToast("Email verification sent");
        this.router.navigate(["login"]);
      })
      .catch(err => {
        this.presentToast(err.message);
      });
  }

  sendEmailVerification() {
    this._afAuth.authState.subscribe(user => {
      user
        .sendEmailVerification()
        .then(() => { })
        .catch(err => {
          this.presentToast(err.message);
        });
    });
  }

 async doLogin(email: string, password: string) {
  //  if (firebase.auth().currentUser.emailVerified) {
      return new Promise<any>((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(
            res => {
              resolve(res);
              this.loggedInStatus = true;
              this.router.navigate([""]);
            },
            err => reject(err)
          );
      }).catch(err => {
        this.presentToast(err.message);
      });
    }
  /**  else {
      this.presentToast("please verify your email");
    }
    
  }
 */

  doLogout() {
    return new Promise((resolve, reject) => {
      this.spotifyService.logout()
      firebase.auth().signOut();
      this.loggedInStatus = false;
      this.router.navigate(["login"]);
    });
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  getCurrentUserID(): string {
    return firebase.auth().currentUser.uid;
  }
}
