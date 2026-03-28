import { Component, inject, signal } from '@angular/core';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent {
  private countryService = inject(CountryService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }), //se define de que depende la consulta, en este caso del valor de query
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-country'], {
        queryParams: { query: request.query },
      });
      return this.countryService.searchByCountry(request.query);
    },
  });
}
