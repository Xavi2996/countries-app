import { Country } from '../interfaces/country.interface';
import { RestCountry } from '../interfaces/rest.countries.interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No name',
      capital: restCountry.capital ? restCountry.capital[0] : '',
      population: restCountry.population,
    };
  }

  static fromRestCountriesToCountries(restCountries: RestCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
