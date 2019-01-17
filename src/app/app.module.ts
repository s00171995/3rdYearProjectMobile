import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { HttpClientModule } from "@angular/common/http";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateSongModalPageModule } from "./pages/create-song-modal/create-song-modal.module";

import "hammerjs";
import { SpotifySearchComponent } from "./components/spotify-search/spotify-search.component";
import { SpotifySearchResultComponent } from "./components/spotify-search-result/spotify-search-result.component";
import { YoutubeSearchComponent } from "./components/youtube-search/youtube-search.component";
import { YoutubeSearchResultComponent } from "./components/youtube-search-result/youtube-search-result.component";
import { YouTubeApiService } from "./services/youtube/youtube-api.service";
import { CreateSongModalPage } from "./pages/create-song-modal/create-song-modal.page";
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { UserSearchComponent } from './components/user-search/user-search.component';

import { CommentsPageModule } from "./pages/comments/comments.module"
import { CommentsPage } from "./pages/comments/comments.page"
import { SearchSongByIdPage } from "./pages/search-song-by-id/search-song-by-id.page";
import { SearchSongByIdPageModule } from "./pages/search-song-by-id/search-song-by-id.module";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas, far, fab)

@NgModule({
  declarations: [
    AppComponent,

    UserSearchComponent
  ],
  entryComponents: [CreateSongModalPage, CommentsPage, SearchSongByIdPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      menuType: "push"
    }),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CreateSongModalPageModule,
    CommentsPageModule,
    SearchSongByIdPageModule,
    FontAwesomeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    YouTubeApiService,
    YoutubeVideoPlayer,
    NativeStorage,
    FirebaseAnalytics,
    GooglePlus,
    Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
