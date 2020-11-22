import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { MaterialModule } from '../shared/modules/material-module';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ManagementComponent],
  imports: [CommonModule, ManagementRoutingModule, MaterialModule, ReactiveFormsModule]
})
export class ManagementModule {}
