import { Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/rest.countries.interfaces';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css',
})
export class CountryListComponent {
  countries = input.required<Country[]>();
}
