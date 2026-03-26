import { Country } from '../interfaces/country.interface';
import { RestCountry } from '../interfaces/rest.countries.interfaces';

export class CountryMapper {
  static fromRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flags.png,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.capital ? restCountry.capital[0] : '',
      population: restCountry.population,
    };
  }

  static fromRestCountriesToCountries(restCountries: RestCountry[]): Country[] {
    return restCountries.map(this.fromRestCountryToCountry);
  }
}
