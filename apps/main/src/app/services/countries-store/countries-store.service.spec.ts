import { TestBed } from '@angular/core/testing';

import { CountriesStoreService } from './countries-store.service';
import { signal } from '@angular/core';
import { countriesMock } from '../../mocks/countries.mock';
import { CountriesActions } from '../../state/countries.actions';
import { Store } from '@ngrx/store';

describe('CountriesStoreService', () => {
  let service: CountriesStoreService;
  const storeMock = {
    dispatch: jest.fn(),
    selectSignal: signal(countriesMock)
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: Store, useValue: storeMock}]
    });
    service = TestBed.inject(CountriesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load countries', () => {
    service.loadCountries('isr');
    expect(storeMock.dispatch).toHaveBeenLastCalledWith(CountriesActions.loadCountries({ name: 'isr' }))
  })
});
