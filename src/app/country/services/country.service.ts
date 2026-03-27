import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest.countries.interfaces';
import { catchError, delay, map, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private httpClient = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.trim().toLowerCase();

    return this.httpClient
      .get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((countries) => {
          if (!countries || countries.length === 0) {
            throw new Error('No countries found');
          }
          return CountryMapper.fromRestCountriesToCountries(countries);
        }),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                'No se pudo encontrar países para la capital: ' + query,
              ),
          );
        }),
      );
  }

  searchByCountry(query: string) {
    query = query.trim().toLowerCase();

    return this.httpClient.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((countries) => {
        if (!countries || countries.length === 0) {
          throw new Error('No countries found');
        }
        return CountryMapper.fromRestCountriesToCountries(countries);
      }),
      // delay(1000),
      catchError((error) => {
        return throwError(
          () =>
            new Error('No se pudo encontrar países con el nombre: ' + query),
        );
      }),
    );
  }

  searchByAlphaCode(code: string) {
    return this.httpClient.get<RestCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((countries) => {
        if (!countries || countries.length === 0) {
          throw new Error('No countries found');
        }
        return CountryMapper.fromRestCountriesToCountries(countries);
      }),

      map((countries) => {
        return countries.at(0);
      }),

      // delay(1000),
      catchError((error) => {
        return throwError(
          () => new Error('No se pudo encontrar países con el código: ' + code),
        );
      }),
    );
  }
}
