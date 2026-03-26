import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.component.html',
  styleUrl: './country-search.component.css',
})
export class CountrySearchComponent {
  searchValue = output<string>();
  placehoder = input<string>('Buscar');

  onSearch(valor: string) {
    this.searchValue.emit(valor);
  }
}
