import { Component } from '@angular/core';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent {
  onSearch(event: string) {
    console.log(event);
  }
}
