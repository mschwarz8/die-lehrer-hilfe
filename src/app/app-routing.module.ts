import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Einstiegspunkt der App (Spaeter 'Login')
  {
    path: '',
    loadChildren: () => import('./attendance-list/attendance-list.module').then(m => m.AttendanceListModule)
  },
  { path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) },
  {
    path: 'attendance-list',
    loadChildren: () => import('./attendance-list/attendance-list.module').then(m => m.AttendanceListModule)
  },
  { path: 'grades-list', loadChildren: () => import('./grades-list/grades-list.module').then(m => m.GradesListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
