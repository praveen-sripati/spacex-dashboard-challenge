import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { SpxHeaderComponent } from './spx-header/spx-header.component';
import { SpxTableComponent } from './shared/spx-table/spx-table.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { SpxFiltersModule } from './shared/spx-filters/spx-filters.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SpxDetailsModalComponent } from './spx-details-modal/spx-details-modal.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    AppComponent,
    SpxHeaderComponent,
    SpxTableComponent,
    StatusChipComponent,
    SpxDetailsModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SpxFiltersModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot(),
    PaginationModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
