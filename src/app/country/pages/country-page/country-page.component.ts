import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent {
  countryService = inject(CountryService);

  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }), //se define de que depende la consulta, en este caso del valor de query
    loader: ({ request }) => {
      if (!request.code) return of(null);

      return this.countryService.searchByAlphaCode(request.code);
    },
  });
}
