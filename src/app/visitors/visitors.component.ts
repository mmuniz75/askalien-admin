import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../model/country';
import { CountryService } from '../../services/country.service';
import { QuestionService } from '../../services/question.service';


@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  providers: [CountryService,QuestionService]
})
export class VisitorsComponent implements OnInit {

  constructor(private _countryService : CountryService,private _questionService : QuestionService) { }
  
    countries:ICountry[];
    errorMessage: string;
    countQuestions:Number;
      
    ngOnInit() {
      this._countryService.getCountries().subscribe(
        countries => this.countries = countries,
        error => this.errorMessage = error
      );

      this._questionService.getCountQuestions().subscribe(
        count => this.countQuestions = count,
        error => this.errorMessage = error
      );
    }

}
