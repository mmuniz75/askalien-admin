
import { Injectable } from '@angular/core';

import { Video } from '../model/video';

import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';

import { environment } from '../environments/environment';

@Injectable()
export class VideoService extends Service{

  private videosUrl = `${environment.SERVER_URL}/videos`;
  private videoUrl = `${environment.SERVER_URL}2/video`;
   
    
  public getVideos() : Observable<Video[]>{
        return this.http.get<Video[]>(this.videosUrl,this.getHttpOptions())
                                      .pipe(
                                        catchError(this.handleError('VideoService','getVideos', []))
                                      );
  }

    
  public saveVideo(video:Video): Observable<Video>{
      return this.http.post<Video>(this.videoUrl, video, this.getHttpOptions())
                            .pipe(
                              catchError(this.handleError<Video>('VideoService','saveVideo'))
                          );
  }

  public isValid(video:Video):boolean{
    if (video.creationDate 
        && video.number && video.number > 0)
        return true;
    else 
        return false;    
}

}
