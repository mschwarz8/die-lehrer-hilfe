import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradesListComponent } from './grades-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: GradesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesListRoutingModule { }
