import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { MaterialModule } from '../shared/modules/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ManagementComponent],
  imports: [CommonModule, ManagementRoutingModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule]
})
export class ManagementModule {}
