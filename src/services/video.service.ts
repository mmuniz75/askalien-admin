import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Video } from '../model/video';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class VideoService {

  private _videosUrl = 'http://' + environment.SERVER_URL + '/videos';
  private _videoUrl = 'http://' + environment.SERVER_URL + '/video';
    
  constructor(private _http: Http) { }
  
  public getVideos() : Observable<Video[]>{
        return this._http.get(this._videosUrl)
            .map((response: Response) => <Video[]> response.json())
            .catch(this.handleError);
      }
    
  public saveVideo(video:Video){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers ,method: "post"});
        
    return this._http.post(this._videoUrl, JSON.stringify(video), options)
                  .catch(this.handleError);

  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }

}
