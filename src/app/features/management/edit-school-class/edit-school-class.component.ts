import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../../shared/user/store/user.state';
import { combineLatest, Observable } from 'rxjs';
import { SchoolClass } from '../../../shared/user/models/school-class';
import { distinctUntilChanged } from 'rxjs/operators';
import { Student } from '../../../shared/user/models/student';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddStudentActionRequest } from '../../../shared/user/store/user.actions';

@Component({
  selector: 'app-edit-school-class',
  templateUrl: './edit-school-class.component.html',
  styleUrls: ['./edit-school-class.component.scss']
})
export class EditSchoolClassComponent implements OnInit {
  public selectedExternalSchoolClassId: string;

  public selectedSchoolClass: SchoolClass;

  public dataSource: MatTableDataSource<Student>;

  public firstNameFormControl: FormControl;

  public lastNameFormControl: FormControl;

  @Select(UserState.getAvailableSchoolClasses)
  public availableSchoolClasses$: Observable<SchoolClass[]>;

  @Select(UserState.isAddStudentToSchoolClassLoading)
  public isAddStudentToSchoolClassLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['firstName', 'lastName', 'action'];

  public addStudentModeActive = false;

  public get confirmAddStudentButtonEnabled(): boolean {
    // Checks if student is already present
    if (!!this.selectedSchoolClass && !!this.selectedSchoolClass.students && this.selectedSchoolClass.students.length > 0) {
      if (!!this.firstNameFormControl && !!this.lastNameFormControl) {
        for (const student of this.selectedSchoolClass.students) {
          if (student.firstName === this.firstNameFormControl.value && student.lastName === this.lastNameFormControl.value) {
            return false;
          }
        }
      }
    }
    return this.firstNameFormControl.valid && this.lastNameFormControl.valid;
  }

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedExternalSchoolClassId = params.externalSchoolClassId;
    });

    combineLatest([this.activatedRoute.params, this.availableSchoolClasses$])
      .pipe(distinctUntilChanged())
      .subscribe(([params, availableSchoolClasses]) => {
        this.selectedExternalSchoolClassId = params.externalSchoolClassId;
        if (!!this.selectedExternalSchoolClassId && !!availableSchoolClasses && availableSchoolClasses.length !== 0) {
          for (const availableSchoolClass of availableSchoolClasses) {
            if (this.selectedExternalSchoolClassId === availableSchoolClass.externalId) {
              this.selectedSchoolClass = availableSchoolClass;
              this.dataSource = new MatTableDataSource<Student>(availableSchoolClass.students);
            }
          }
        }
      });

    this.firstNameFormControl = this.fb.control(null, Validators.required);
    this.lastNameFormControl = this.fb.control(null, Validators.required);
  }

  public addNewStudent(): void {
    console.log('Should add new student ' + this.firstNameFormControl.value + ' ' + this.lastNameFormControl.value);
    console.log('Should dispatch action for creating a new student');
    this.store.dispatch(
      new AddStudentActionRequest(
        this.selectedExternalSchoolClassId,
        this.firstNameFormControl.value,
        this.lastNameFormControl.value
      )
    );
    this.dataSource._updateChangeSubscription();
  }

  public editStudent(student: Student): void {
    console.log('Dialog should open with editing Student ' + student.firstName + ' ' + student.lastName);
    this.dataSource._updateChangeSubscription();
  }
}
