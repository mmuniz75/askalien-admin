import { Component, OnInit , ViewChild,ElementRef } from '@angular/core';
import { ICountry } from '../../model/country';
import { CountryService } from '../../services/country.service';
import { QuestionService } from '../../services/question.service';

declare var $: any;

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html'
})
export class VisitorsComponent implements OnInit {

  constructor(private countryService : CountryService,
              private questionService : QuestionService) { }
  
    countries:ICountry[];
    countQuestions:Number;
          
    ngOnInit() {
      this.countryService.getCountries().subscribe(
        countries => this.countries = countries
      );

      this.questionService.getCountQuestions().subscribe(
        count => this.countQuestions = count
      );

      this.countryService.getCountriesCode().subscribe(
        codes => this.init_JQVmap(codes)
      );
    }

    init_JQVmap(countries){
            if ($('#world-map-gdp').length ){
           
              $('#world-map-gdp').vectorMap({
                map: 'world_en',
                backgroundColor: null,
                color: '#ffffff',
                hoverOpacity: 0.7,
                selectedColor: '#666666',
                enableZoom: true,
                showTooltip: true,
                values: countries,
                scaleColors: ['#E6F2F0', '#149B7E'],
                normalizeFunction: 'polynomial'
              });
            
            }
            
    };

}
