import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { SpxHeaderComponent } from './spx-header/spx-header.component';
import { SpxTableComponent } from './spx-table/spx-table.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { SpxFiltersComponent } from './spx-filters/spx-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    SpxHeaderComponent,
    SpxTableComponent,
    StatusChipComponent,
    SpxFiltersComponent,
  ],
  imports: [BrowserModule, MatSelectModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
