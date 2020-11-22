import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceListRoutingModule } from './attendance-list-routing.module';
import { AttendanceListComponent } from './attendance-list.component';
import { MaterialModule } from '../shared/modules/material-module';

@NgModule({
  declarations: [AttendanceListComponent],
  imports: [
    CommonModule,
    AttendanceListRoutingModule,
    MaterialModule
  ]
})
export class AttendanceListModule { }
