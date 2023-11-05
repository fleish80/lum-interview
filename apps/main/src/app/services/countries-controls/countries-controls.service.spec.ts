import { TestBed } from '@angular/core/testing';

import { CountriesControlsService } from './countries-controls.service';

describe('CountriesControlsService', () => {
  let service: CountriesControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
