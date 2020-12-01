import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { AvailableSchoolClassesFetchRequest, SelectSchoolClass } from '../../../shared/user/store/user.actions';
import { UserState } from '../../../shared/user/store/user.state';
import { Observable } from 'rxjs';
import { SchoolClass } from '../../../shared/user/models/school-class';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  snav: MatSidenav;

  schoolClassFormControl = new FormControl('');

  @Select(UserState.getAvailableSchoolClasses)
  public availableSchoolClasses$: Observable<SchoolClass[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new AvailableSchoolClassesFetchRequest('bbf43adf-e1c1-4cb5-89a5-1a1a87ce6ac8'));
  }

  selectClass(selectedSchoolClass: SchoolClass): void {
    console.log('Value changed ' + selectedSchoolClass);
    this.store.dispatch(new SelectSchoolClass(selectedSchoolClass));
  }

  sidenavToggleButtonClicked(): void {
    this.snav.toggle();
  }
}
