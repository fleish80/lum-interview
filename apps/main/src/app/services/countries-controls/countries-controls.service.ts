import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, skipWhile } from 'rxjs';
import { CountriesStoreService } from '../countries-store/countries-store.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesControlsService {

  nameCtrl = new FormControl('', { nonNullable: true });
  #countriesStoreServicece = inject(CountriesStoreService);

  constructor() {
    this.nameCtrl.valueChanges
      .pipe(
        skipWhile(name => name.length < 2),
        debounceTime(500),
        takeUntilDestroyed())
      .subscribe(name => {
        this.#countriesStoreServicece.loadCountries(name);
      })
  }
}
