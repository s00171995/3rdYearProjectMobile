export class Post {
    UserID: string;
    songId: string;
    artistName: string;
    songName: string;
    albumArt: string;
    caption: string;
    createdAt: Date;
    externalUri: string;
    previewUrl: string;
    postType: string;
    commentCounter: number;
    likeCounter: number;
    id?:string;
    tags?: string[];
  
    constructor(userId:string, songId: string, artistName: string, 
      songName: string, albumArt: string, caption: string,
       externalUri: string, previewUrl: string, postType: string,
       commentCounter: number, likeCounter: number, tags: string[]) {
      this.songId = songId;
      this.artistName = artistName;
      this.songName = songName;
      this.albumArt = albumArt;
      this.caption = caption || "";
      this.UserID = userId || "";
      this.externalUri = externalUri,
      this.previewUrl = previewUrl,
      this.postType = postType,
      this.likeCounter = likeCounter,
      this.commentCounter = commentCounter,
      this.tags = tags;
    }
  }
  