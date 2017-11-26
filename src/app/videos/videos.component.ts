import { Component, OnInit } from '@angular/core';

import { Video } from '../../model/video';
import { VideoService } from '../../services/video.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  providers: [VideoService]
})
export class VideosComponent implements OnInit {

  constructor(private _videoService : VideoService) { }
  
    videos:Video[];
    errorMessage: string;
    videoRec:Video;
          
    ngOnInit() {
      this.loadVideos();
    }

    loadVideos() {
      this._videoService.getVideos().subscribe(
        videos => this.videos = videos,
        error => this.errorMessage = error
      );
    }

    setVideo(video:Video):void{
      this.videoRec = video;
    }

    resetVideo():void{
      this.videoRec = new Video();
    }

    saveVideo():void{
      var creationDate = new Date(this.videoRec.formatedDate);
      creationDate.setDate(creationDate.getDate() + 1);
      this.videoRec.creationDate = creationDate;
      
      this._videoService.saveVideo(this.videoRec).subscribe(
        this.loadVideos,
        error => this.errorMessage = error
      );
      
    }

}
