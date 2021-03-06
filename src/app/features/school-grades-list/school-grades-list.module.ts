import { NgModule } from '@angular/core';

import { SchoolGradesListRoutingModule } from './school-grades-list-routing.module';
import { SchoolGradesListComponent } from './school-grades-list.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { SchoolExamState } from '../school-grades-list/store/school-exam.state';

@NgModule({
  declarations: [SchoolGradesListComponent],
  imports: [
    SchoolGradesListRoutingModule,
    SharedModule,
    NgxsModule.forFeature([UserState, SchoolExamState]),
  ]
})
export class SchoolGradesListModule { }
