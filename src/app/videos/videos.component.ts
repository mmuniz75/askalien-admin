import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

import { Video } from '../../model/video';
import { VideoService } from '../../services/video.service';
import { LoginService } from '../../services/login.service';

declare var $: any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {

  constructor(private videoService : VideoService,
             private loginService : LoginService) { }
  
    videos:Video[];
    video:Video;
    @ViewChild('closeModal') closeModal: ElementRef;
    loading: boolean;
          
    ngOnInit() {
      this.loading = true;
      this.videoService.getVideos().subscribe(
        videos => this.setVideos(videos)
      );
      $.getScript("../../assets/js/custom.min.js");
    }

    setVideos(videos:Video[]): void{
      this.videos = videos;
      this.loading = false;
    }

    setVideo(video:Video):void{
      this.video = video;
    }

    addVideo():void{
      this.video = new Video();
    }

    saveVideo():void{
      if(this.videoService.isValid(this.video)){
        const newVideo:boolean = this.video.id?false:true;
        
        this.videoService.saveVideo(this.video).subscribe(
          video => this.updateList(video,newVideo)
        );
        
      }
    }
    
    updateList(video:Video,isNew:boolean){
      if(isNew)
        this.videos.splice(0,0,video);
      
      this.closeModal.nativeElement.click();
    }

    isAdmin():boolean{
      return this.loginService.isAdmin();
    }
}
