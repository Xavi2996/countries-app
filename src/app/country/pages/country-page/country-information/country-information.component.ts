import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css',
})
export class CountryInformationComponent {
  country = input.required<Country>();
  ngOnInit() {
    console.log(this.country());
  }
}
