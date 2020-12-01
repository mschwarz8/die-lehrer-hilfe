import { NgModule } from '@angular/core';

import { GradesListRoutingModule } from './grades-list-routing.module';
import { GradesListComponent } from './grades-list.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';

@NgModule({
  declarations: [GradesListComponent],
  imports: [
    GradesListRoutingModule,
    SharedModule,
    NgxsModule.forFeature([UserState]),
  ]
})
export class GradesListModule { }
