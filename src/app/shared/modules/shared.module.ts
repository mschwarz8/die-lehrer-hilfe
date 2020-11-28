import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [
    // Modules
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule
  ],
})
export class SharedModule {}
