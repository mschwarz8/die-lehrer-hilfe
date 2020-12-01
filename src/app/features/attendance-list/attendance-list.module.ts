import { NgModule } from '@angular/core';

import { AttendanceListRoutingModule } from './attendance-list-routing.module';
import { AttendanceListComponent } from './attendance-list.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [AttendanceListComponent],
  imports: [
    AttendanceListRoutingModule,
    SharedModule
  ]
})
export class AttendanceListModule { }
