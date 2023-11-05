import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { CountriesState } from "./countries.state";
import { CountriesActions } from "./countries.actions";

const initialState: CountriesState = {
  countries: [],
  countriesMap: {}
};

// Selector functions
const getCountriesFeatureState = createFeatureSelector<CountriesState>('countries');

export const selectGetCountries = createSelector(
  getCountriesFeatureState,
  state => state.countries
);

export const selectGetCountriesMap = createSelector(
  getCountriesFeatureState,
  state => state.countriesMap
);


export const countriesReducer = createReducer<CountriesState>(
  initialState,
  on(CountriesActions.loadCountriesSuccess, (state, action): CountriesState => {
    const countriesMap = {...state.countriesMap};
    if (action.countries && action.countries.length > 0) {
      countriesMap[action.name] = action.countries;
    }
    return {
      ...state,
      countriesMap,
      countries: action.countries
    };
  }),
  on(CountriesActions.loadCountriesFailure, (state): CountriesState => {
    return {
      ...state,
      countries: []
    };
  }),
  on(CountriesActions.loadCountriesFromMap, (state, action): CountriesState => {
    return {
      ...state,
      countries: state.countriesMap[action.name]
    };
  }),
);

