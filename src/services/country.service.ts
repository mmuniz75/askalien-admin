import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { ICountry } from '../model/Country';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class CountryService {

  private _countries = 'http://' + environment.SERVER_URL + '/countries';
    
  constructor(private _http: Http) { }

  public getCountries() : Observable<ICountry[]>{

    return this._http.get(this._countries)
        .map((response: Response) => <ICountry[]> response.json())
        .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }

}
