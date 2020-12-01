import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [ManagementComponent],
  imports: [ManagementRoutingModule, SharedModule]
})
export class ManagementModule {}
