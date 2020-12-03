import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { Observable } from 'rxjs';
import { CreateSchoolClassRequest } from '../../shared/user/store/user.actions';
import { SchoolClass } from '../../shared/user/models/school-class';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  public createNewSchoolClassFormGroup: FormGroup | undefined;

  public createNewSchoolClassMode = false;

  @Select(UserState.getAvailableSchoolClasses)
  public availableSchoolClasses$: Observable<SchoolClass>;

  @Select(UserState.isCreateNewSchoolClassRequestLoading)
  public createSchoolClassRequestLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['className', 'numberStudents'];

  public get atLeastOneStudentFormGroupPresent(): boolean {
    return !!this.students && this.students.length > 0;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createNewSchoolClassFormGroup = this.fb.group({
      className: [null, Validators.required],
      students: this.fb.array([])
    });
  }

  public addNewStudent(): void {
    this.students.push(
      this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required]
      })
    );
  }

  public removeLastStudent(): void {
    if (this.atLeastOneStudentFormGroupPresent) {
      this.students.removeAt(this.students.length - 1);
    }
  }

  public enterCreateNewClassMode(): void {
    this.createNewSchoolClassMode = true;
  }

  public createNewClass(): void {
    console.log('TODO: Erstelle neue Klasse...');
    this.store.dispatch(new CreateSchoolClassRequest(this.classNameFormControl.value, this.students.value));
  }

  public get classNameFormControl(): FormControl {
    return this.createNewSchoolClassFormGroup.get('className') as FormControl;
  }

  public get students(): FormArray {
    return this.createNewSchoolClassFormGroup.get('students') as FormArray;
  }
}
