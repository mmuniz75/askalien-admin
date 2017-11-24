import { Component, OnInit } from '@angular/core';

import { IVideo } from '../../model/video';
import { Video } from '../../model/video';
import { VideoService } from '../../services/video.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  providers: [VideoService]
})
export class VideosComponent implements OnInit {

  constructor(private _videoService : VideoService) { }
  
    videos:IVideo[];
    errorMessage: string;
    videoRec:IVideo;
          
    ngOnInit() {
      this._videoService.getVideos().subscribe(
        videos => this.videos = videos,
        error => this.errorMessage = error
      );
    }

    setVideo(video:IVideo):void{
      this.videoRec = video;
    }

    resetVideo():void{
      this.videoRec = new Video();
    }

}
