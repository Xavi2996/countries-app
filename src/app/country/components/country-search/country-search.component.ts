import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.component.html',
  styleUrl: './country-search.component.css',
})
export class CountrySearchComponent {
  searchValue = output<string>();
  placehoder = input<string>('Buscar');
  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() || '');

  debounceEffext = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, 500);

    onCleanup(() => clearTimeout(timeout));
  });
}
