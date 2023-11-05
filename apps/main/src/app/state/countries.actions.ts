import { createAction, props } from "@ngrx/store";
import { Country } from "../models/country.model";
import { HttpErrorResponse } from "@angular/common/http";

const actionName = '[COUNTRIES]';

const loadCountries = createAction(
    `${actionName} Load`,
    props<{name: string}>()
);

const loadCountriesSuccess = createAction(
    `${actionName} Load Success`,
    props<{ name: string; countries: Country[] }>()
);

const loadCountriesFailure = createAction(
    `${actionName} Load Fail`,
    props<{ error: HttpErrorResponse }>()
);

const loadCountriesFromMap = createAction(
    `${actionName} Load From Map`,
    props<{ name: string }>()
);

export const CountriesActions = {
    loadCountries,
    loadCountriesSuccess,
    loadCountriesFailure,
    loadCountriesFromMap
};