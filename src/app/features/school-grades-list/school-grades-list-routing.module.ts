import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolGradesListComponent } from './school-grades-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: SchoolGradesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolGradesListRoutingModule { }
