import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CountriesState } from '../../state/countries.state';
import { CountriesActions } from '../../state/countries.actions';
import { selectGetCountries } from '../../state/countries.reducer';

@Injectable({
  providedIn: 'root'
})
export class CountriesStoreService {

  #store = inject(Store<CountriesState>);

  readonly countries = this.#store.selectSignal(selectGetCountries);

  loadCountries(name: string) {
    this.#store.dispatch(CountriesActions.loadCountries({ name }));
  }

}
