import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest.countries.interfaces';
import { catchError, count, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private httpClient = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); //Se crea un cache para almacenar los resultados de las consultas por capital yipo clave-valor, donde la clave es la consulta y el valor es el resultado de la consulta (un array de países)
  private queryCacheCountry = new Map<string, Country[]>(); //Se crea un cache para almacenar los resultados de las consultas por país yipo clave-valor, donde la clave es la consulta y el valor es el resultado de la consulta (un array de países)

  searchByCapital(query: string) {
    query = query.trim().toLowerCase();
    if (this.queryCacheCapital.has(query)) {
      console.log(this.queryCacheCapital);
      console.log(this.queryCacheCapital.get(query));

      return of(this.queryCacheCapital.get(query) ?? []); //regresa el array del pais
    }

    console.log('Se va a consumir el servicio');

    return this.httpClient
      .get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((countries) => {
          if (!countries || countries.length === 0) {
            throw new Error('No countries found');
          }
          return CountryMapper.fromRestCountriesToCountries(countries);
        }),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
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

    if (this.queryCacheCountry.has(query)) {
      console.log(this.queryCacheCountry);
      console.log(this.queryCacheCountry.get(query));
      return of(this.queryCacheCountry.get(query) ?? []); //regresa el array del pais
    }

    console.log('Se va a consumir el servicio para traer por pais');

    return this.httpClient.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((countries) => {
        if (!countries || countries.length === 0) {
          throw new Error('No countries found');
        }
        return CountryMapper.fromRestCountriesToCountries(countries);
      }),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
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
