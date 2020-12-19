import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { Observable } from 'rxjs';
import { CreateSchoolClassActionRequest } from '../../shared/user/store/user.actions';
import { SchoolClass } from '../../shared/user/models/school-class';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolSubjectDialogComponent } from './add-school-subject-dialog/add-school-subject-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  animations: [
    trigger('expandDetails', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ManagementComponent implements OnInit {
  public createNewSchoolClassFormGroup: FormGroup | undefined;

  public expandedSchoolClass: SchoolClass | null;

  public createNewSchoolClassMode = false;

  @Select(UserState.getAvailableSchoolClasses)
  public availableSchoolClasses$: Observable<SchoolClass>;

  @Select(UserState.isCreateNewSchoolClassRequestLoading)
  public createSchoolClassRequestLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['className', 'numberStudents', 'action'];

  public get atLeastOneStudentFormGroupPresent(): boolean {
    return !!this.students && this.students.length > 0;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
    this.store.dispatch(new CreateSchoolClassActionRequest(this.classNameFormControl.value, this.students.value));
  }

  public addSchoolSubject(schoolClass: SchoolClass): void {
    const dialogRef = this.matDialog.open(AddSchoolSubjectDialogComponent, {
      width: '250px',
      data: { schoolClass }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public editClass(schoolClass: SchoolClass): void {
    console.log('Editing schoolClass ' + schoolClass.name);
    console.log('Navigating to new component');
    this.router.navigate(['../school-class', schoolClass.externalId, 'edit'], { relativeTo: this.activatedRoute });
  }

  public get classNameFormControl(): FormControl {
    return this.createNewSchoolClassFormGroup.get('className') as FormControl;
  }

  public get students(): FormArray {
    return this.createNewSchoolClassFormGroup.get('students') as FormArray;
  }
}
