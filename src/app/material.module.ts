import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatButtonModule
  ],
  exports: [
    MatSliderModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
