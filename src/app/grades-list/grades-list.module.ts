import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradesListRoutingModule } from './grades-list-routing.module';
import { GradesListComponent } from './grades-list.component';
import { MaterialModule } from '../shared/modules/material-module';

@NgModule({
  declarations: [GradesListComponent],
  imports: [
    CommonModule,
    GradesListRoutingModule,
    MaterialModule
  ]
})
export class GradesListModule { }
