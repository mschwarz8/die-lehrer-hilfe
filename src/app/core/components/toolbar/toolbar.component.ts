import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import {
  AvailableSchoolClassesFetchRequest,
  SelectSchoolClass,
  SelectSchoolSubject
} from '../../../shared/user/store/user.actions';
import { UserState } from '../../../shared/user/store/user.state';
import { Observable } from 'rxjs';
import { SchoolClass } from '../../../shared/user/models/school-class';
import { SchoolSubjectEnum } from '../../../shared/user/models/school-subject-enum';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  snav: MatSidenav;

  schoolClassFormControl = new FormControl('');

  schoolSubjectFormControl = new FormControl('');

  @Select(UserState.getAvailableSchoolClasses)
  public availableSchoolClasses$: Observable<SchoolClass[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // For debugging selecting the first schoolClass
    this.availableSchoolClasses$.pipe(take(2)).subscribe(availableSchoolClasses => {
      if (!!availableSchoolClasses && availableSchoolClasses.length > 0) {
        const firstSchoolClass = availableSchoolClasses[0];
        this.schoolClassFormControl.setValue(firstSchoolClass);
        if (!!firstSchoolClass.schoolSubjects && firstSchoolClass.schoolSubjects.length > 0) {
          this.schoolSubjectFormControl.setValue(firstSchoolClass.schoolSubjects[0]);
        }
      }
    });
    this.store.dispatch(new AvailableSchoolClassesFetchRequest('bbf43adf-e1c1-4cb5-89a5-1a1a87ce6ac8'));
  }

  selectSchoolClass(selectedSchoolClass: SchoolClass): void {
    console.log('Selected schoolClass ' + selectedSchoolClass.name);
    this.store.dispatch(new SelectSchoolClass(selectedSchoolClass));
    this.schoolSubjectFormControl.setValue(null);
  }

  selectSchoolSubject(selectedSchoolSubject: SchoolSubjectEnum): void {
    console.log('Selected schoolSubject ' + selectedSchoolSubject);
    this.store.dispatch(new SelectSchoolSubject(selectedSchoolSubject));
  }

  sidenavToggleButtonClicked(): void {
    this.snav.toggle();
  }
}
