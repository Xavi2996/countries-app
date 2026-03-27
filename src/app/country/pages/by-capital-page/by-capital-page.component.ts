import { Component, computed, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  private countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }), //se define de que depende la consulta, en este caso del valor de query
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCapital(request.query);
    },
  });

  //*****DEVUELVE PROMESA NO OBSERVABLE ******/
  // countryResource = resource({
  //   request: () => ({ query: this.query() }), //se define de que depende la consulta, en este caso del valor de query
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query),
  //     );
  //   },
  // });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {

  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       console.log(countries);
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       console.log(error);

  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(error);
  //     },
  //     complete: () => {
  //       this.isLoading.set(false);
  //     },
  //   });
  // }
}
