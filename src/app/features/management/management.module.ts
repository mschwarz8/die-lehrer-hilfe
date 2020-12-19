import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { AddSchoolSubjectDialogComponent } from './add-school-subject-dialog/add-school-subject-dialog.component';
import { EditSchoolClassComponent } from './edit-school-class/edit-school-class.component';

@NgModule({
  declarations: [ManagementComponent, AddSchoolSubjectDialogComponent, EditSchoolClassComponent],
  imports: [ManagementRoutingModule, SharedModule, NgxsModule.forFeature([UserState])]
})
export class ManagementModule {}
