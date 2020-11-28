import { NgModule } from '@angular/core';

import { GradesListRoutingModule } from './grades-list-routing.module';
import { GradesListComponent } from './grades-list.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [GradesListComponent],
  imports: [
    GradesListRoutingModule,
    SharedModule
  ]
})
export class GradesListModule { }
