import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { CommonModule } from '@angular/common';
import { APP_DATE_FORMATS, AppDateAdapter } from '../adapters/date.adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [
    // Modules
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class SharedModule {}
