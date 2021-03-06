import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { MenuController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { DateTimeConvertPipe } from '../../pipes/date-time-convert.pipe';
import { IPost } from '../../interfaces/post-interface';
import { IFollow } from '../../interfaces/follow.interface';
import { FollowService } from '../../services/follow/follow.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { NavParams } from '@ionic/angular';
import { IUser } from '../../interfaces/user-interface';
@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.page.html',
  styleUrls: ['./profile-modal.page.scss'],
})
export class ProfileModalPage implements OnInit {
  public editing: boolean = false;
  public followersCounter: number;
  public followingCounter: number;
  public postsCounter: number;
  public profilePicture: any = null;
  public memberSince: Date;
  public userId: string;
  public user: IUser;
  public btnValue = "follow";
  public buttonFill = "outline";
  public compareFollow: IFollow
  public isFollowing: boolean;


  constructor(
    private auth: FirebaseAuthService,
    private menuCtrl: MenuController,
    private db: DatabaseService,
    private followService: FollowService,
    private navParams: NavParams,
    private modalController: ModalController,
    private firebaseAuth: FirebaseAuthService,
    //private analytics: AnalyticsService
  ) {
    this.userId = navParams.data.userId
    console.log(this.userId)
  }
  ngOnInit() {
    // this.toDateTime(this.user.createdAt.seconds)

    this.db.getUserByID(this.userId).subscribe(data => {
      this.user = data
      this.memberSince = this.toDateTime(data.createdAt.seconds);
    })
    this.db.getLoggedInUserPosts().subscribe(posts => {
      this.postsCounter = posts.length
    });
    this.followService.getFollowedUsers().subscribe(following => {
      this.followingCounter = following.length
    });
    this.followService.getFollowingUsers(this.userId).subscribe(followers => {
      this.followersCounter = followers.length
    })
  }

  toDateTime(secs: number) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  goBack() {
    this.modalController.dismiss();
  }
  follow() {
    // this.analytics.log("followInUserSearch", { param: "Followed_InUserSearch" } )
    this.btnValue = "unfollow";
    this.buttonFill = "solid";

    let follow: IFollow = {
      followedId: this.user.uid,
      followerId: this.firebaseAuth.getCurrentUserID()
    }
    this.followService.addFollow(follow)

  }

  unfollow() {
    // this.analytics.log("UnfollowInUserSearch", { param: "Unfollowed_InUserSearch" } )
    this.btnValue = "follow";
    this.buttonFill = "outline";
    this.followService.removeFollowing(this.compareFollow.id);
    this.isFollowing = false;
  }
}