import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { IVideo } from '../model/video';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class VideoService {

  private _videos = 'http://' + environment.SERVER_URL + '/videos';
    
  constructor(private _http: Http) { }
  
  public getVideos() : Observable<IVideo[]>{
        return this._http.get(this._videos)
            .map((response: Response) => <IVideo[]> response.json())
            .catch(this.handleError);
      }
    

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }

}
