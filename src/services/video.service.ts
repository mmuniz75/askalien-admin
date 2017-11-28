
import { Injectable } from '@angular/core';

import { Video } from '../model/video';

import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';
import { HTTP_OPTIONS } from './consts';


import { environment } from '../environments/environment';

@Injectable()
export class VideoService extends Service{

  private videosUrl = `http://${environment.SERVER_URL}/videos`;
  private videoUrl = `http://${environment.SERVER_URL}/video`;
   
    
  public getVideos() : Observable<Video[]>{
        return this.http.get<Video[]>(this.videosUrl)
                                      .pipe(
                                        catchError(this.handleError('VideoService','getVideos', []))
                                      );
  }

    
  public saveVideo(video:Video): Observable<Video>{
      return this.http.post<Video>(this.videoUrl, video, HTTP_OPTIONS)
                            .pipe(
                              catchError(this.handleError<Video>('VideoService','saveVideo'))
                          );
  }

  public isValid(video:Video):boolean{
    if (video.formatedCreationDate && video.formatedCreationDate.length > 0
        && video.number && video.number > 0)
        return true;
    else 
        return false;    
}

}
