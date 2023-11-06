import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CountriesControlsService } from './services/countries-controls/countries-controls.service';
import { CountriesStoreService } from './services/countries-store/countries-store.service';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, ScrollingModule, MatInputModule],
  selector: 'df-root',
  template: `
    <mat-form-field>
      <input type="text" placeholder="Pick Country" [formControl]="nameCtrl" matInput [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete">
        <cdk-virtual-scroll-viewport class="scroll-viewport" itemSize="10" >
          <mat-option *cdkVirtualFor="let country of countries()" [value]="country.name.common">
            {{country.name.common}}
          </mat-option>
        </cdk-virtual-scroll-viewport>
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: [
    `
    :host {
      padding-block-start: 50px;
      display: flex;
      justify-content: center;
    }

    .scroll-viewport {
      height: 200px;
    }
    `

  ],
})
export class AppComponent {

  #countriesStoreService = inject(CountriesStoreService);
  countries = this.#countriesStoreService.countries;
  #countriesControlsService = inject(CountriesControlsService);
  nameCtrl = this.#countriesControlsService.nameCtrl;

}
