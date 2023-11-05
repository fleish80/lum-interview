import { Injectable, inject } from '@angular/core';

import { mergeMap, map, catchError, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesService } from '../services/countries/countries.service';
import { CountriesActions } from './countries.actions';
import { Store } from '@ngrx/store';
import { selectGetCountriesMap } from './countries.reducer';
import { CountriesState } from './countries.state';

@Injectable()
export class CountriesEffects {

    #actions$ = inject(Actions);
    #countriesService = inject(CountriesService);

    #store = inject(Store<CountriesState>);

    #countriesMap = this.#store.selectSignal(selectGetCountriesMap);

    loadCountries$ = createEffect(() => {
        return this.#actions$
            .pipe(
                ofType(CountriesActions.loadCountries),
                switchMap(({ name }) => {

                    const countries = this.#countriesMap()[name];
                    if (countries) {
                        return of(CountriesActions.loadCountriesFromMap({name}));
                    }
                    return this.#countriesService.getCountries(name)
                        .pipe(
                            map(countries => CountriesActions.loadCountriesSuccess({ name, countries })),
                            catchError(error => of(CountriesActions.loadCountriesFailure({ error })))
                        )
                })

            );
    });
}
