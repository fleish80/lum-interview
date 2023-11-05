import { Country } from "../models/country.model";

export interface CountriesState {
    countries: Country[],
    countriesMap: Record<string, Country[]>;
}