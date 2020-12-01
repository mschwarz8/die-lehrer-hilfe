import { NgModule } from '@angular/core';

import { AttendanceListRoutingModule } from './attendance-list-routing.module';
import { AttendanceListComponent } from './attendance-list.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';

@NgModule({
  declarations: [AttendanceListComponent],
  imports: [
    AttendanceListRoutingModule,
    SharedModule,
    NgxsModule.forFeature([UserState]),
  ]
})
export class AttendanceListModule { }
