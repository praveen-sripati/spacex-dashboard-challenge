import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { SpxHeaderComponent } from './spx-header/spx-header.component';
import { SpxTableComponent } from './shared/spx-table/spx-table.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { SpxFiltersModule } from './shared/spx-filters/spx-filters.module';

@NgModule({
  declarations: [
    AppComponent,
    SpxHeaderComponent,
    SpxTableComponent,
    StatusChipComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    SpxFiltersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
