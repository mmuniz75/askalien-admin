import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

import { Video } from '../../model/video';
import { VideoService } from '../../services/video.service';

declare var $: any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {

  constructor(private videoService : VideoService) { }
  
    videos:Video[];
    video:Video;
    @ViewChild('closeModal') closeModal: ElementRef;
          
    ngOnInit() {
      this.videoService.getVideos().subscribe(
        videos => this.videos = videos
      );
      $.getScript("../../assets/js/custom.min.js");
    }

    setVideo(video:Video):void{
      this.video = video;
    }

    addVideo():void{
      this.video = new Video();
    }

    saveVideo():void{
      if(this.videoService.isValid(this.video)){
        var creationDate = new Date(this.video.formatedCreationDate);
        creationDate.setDate(creationDate.getDate() + 1);
        this.video.creationDate = creationDate;
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

}
