import { Injectable, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CountriesStoreService } from '../countries-store/countries-store.service';
import { debounce, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesControlsService {

  nameCtrl = new FormControl('', { nonNullable: true });
  #countriesStoreServicece = inject(CountriesStoreService);

  constructor() {
    this.nameCtrl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed())
      .subscribe(name => {
        this.#countriesStoreServicece.loadCountries(name);
      })
  }
}
