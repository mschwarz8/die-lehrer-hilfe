import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';

@NgModule({
  declarations: [ManagementComponent],
  imports: [ManagementRoutingModule, SharedModule, NgxsModule.forFeature([UserState]),]
})
export class ManagementModule {}
