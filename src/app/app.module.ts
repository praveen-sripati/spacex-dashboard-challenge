import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { SpxHeaderComponent } from './spx-header/spx-header.component';
import { SpxTableComponent } from './shared/spx-table/spx-table.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { SpxFiltersModule } from './shared/spx-filters/spx-filters.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
    SpxHeaderComponent,
    SpxTableComponent,
    StatusChipComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    SpxFiltersModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
