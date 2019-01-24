import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profilePicture: any;

  constructor(private auth: FirebaseAuthService,
    private menuCtrl: MenuController,
    private db: DatabaseService,
    private router: Router,
    private camera: Camera,
    private file: File,
 //   private imagePicker: ImagePicker
    ) { }
  ngOnInit() {
    this.loadProfilePictureURL();
  }

  loadProfilePictureURL() {
    this.db.getProfilePictureURL().then(data => {
      this.profilePicture = data
    })
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  signOut() {
    this.auth.doLogout();
  }
  getFollowers() {

  }
  navigateToSettings() {
    this.router.navigate(['settings'])
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 1000,
      targetWidth: 1000
    };
    let cameraInfo = await this.camera.getPicture(options);
    this.makeFileIntoBlob(cameraInfo)
  }

  async selectImageFromGallery() {
  /**
    const options: ImagePickerOptions = {

    };

    let cameraInfo = await this.imagePicker.getPictures(options)
 */
    //   this.makeFileIntoBlob(cameraInfo)

  }
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;
          // get the path..
          let path = nativeURL
            .substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;
          // we are provided the name, so now read the file 
          // into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });

          this.db.storeProfilePicture(imgBlob)
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }
}
