import { Injectable } from '@angular/core';

import { ICountry } from '../model/Country';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';

import { environment } from '../environments/environment';

@Injectable()
export class CountryService extends Service{

  private countriesUrl = `http://${environment.SERVER_URL}/countries`;
  private countriesCodeUrl = `http://${environment.SERVER_URL}/countriesCode`;

  public getCountries() : Observable<ICountry[]>{

    return this.http.get<ICountry[]>(this.countriesUrl,this.getHttpOptions())
                        .pipe(
                          catchError(this.handleError('CountryService','getCountries', []))
                        );
  }

  public getCountriesCode() : Observable<any[]>{
    
    return this.http.get<any[]>(this.countriesCodeUrl,this.getHttpOptions())
                        .pipe(
                          catchError(this.handleError('CountryService','getCountries', []))
                        );
  }

}
