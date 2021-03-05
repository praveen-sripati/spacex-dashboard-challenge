// import the new component
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleSelectComponent } from './simple-select/simple-select.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatMenuModule, MatButtonModule],
  declarations: [SimpleSelectComponent],
  exports: [SimpleSelectComponent],
})
export class SpxFiltersModule {}
