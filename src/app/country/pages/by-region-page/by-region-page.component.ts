import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { NgClass } from '../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  regionValue = signal<Region>('Africa');

  regionResource = rxResource({
    request: () => ({ region: this.regionValue() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    },
  });
}
