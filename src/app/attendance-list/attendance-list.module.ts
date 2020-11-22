import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceListRoutingModule } from './attendance-list-routing.module';
import { AttendanceListComponent } from './attendance-list.component';


@NgModule({
  declarations: [AttendanceListComponent],
  imports: [
    CommonModule,
    AttendanceListRoutingModule
  ]
})
export class AttendanceListModule { }
