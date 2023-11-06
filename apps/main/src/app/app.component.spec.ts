import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { countriesMock } from './mocks/countries.mock';
import { DebugElement, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountriesStoreService } from './services/countries-store/countries-store.service';
import { CountriesControlsService } from './services/countries-controls/countries-controls.service';

describe('AppComponent', () => {

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let componentDebugElm: DebugElement;

  beforeEach(async () => {

    const mockCountriesStoreService = {
      countries: signal(countriesMock)
    };

    const mockCountriesControlsService = {
      nameCtrl: new FormControl('', {nonNullable: true})
    }

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {provide: CountriesStoreService, useValue: mockCountriesStoreService},
        {provide: CountriesControlsService, useValue: mockCountriesControlsService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    componentDebugElm = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


});
