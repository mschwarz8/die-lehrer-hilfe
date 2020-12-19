import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SchoolSubjectEnum } from './../../../shared/user/models/school-subject-enum';
import { SchoolClass } from '../../../shared/user/models/school-class';
import { Store } from '@ngxs/store';
import { AddSchoolSubjectActionRequest } from '../../../shared/user/store/user.actions';

export interface AddSchoolSubjectDialogData {
  schoolClass: SchoolClass;
}

@Component({
  selector: 'app-add-school-subject-dialog',
  templateUrl: './add-school-subject-dialog.component.html',
  styleUrls: ['./add-school-subject-dialog.component.scss']
})
export class AddSchoolSubjectDialogComponent {
  schoolSubjectFormControl = new FormControl('');

  public get creatableSchoolSubjects(): SchoolSubjectEnum[] {
    const creatableSchoolSubjects: SchoolSubjectEnum[] = [];
    for (const schoolSubject of Object.keys(SchoolSubjectEnum)) {
      if (this.data.schoolClass.schoolSubjects.indexOf(SchoolSubjectEnum[schoolSubject]) === -1) {
        creatableSchoolSubjects.push(SchoolSubjectEnum[schoolSubject]);
      }
    }
    return creatableSchoolSubjects;
  }

  constructor(
    public dialogRef: MatDialogRef<AddSchoolSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddSchoolSubjectDialogData,
    private store: Store
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.store.dispatch(
      new AddSchoolSubjectActionRequest(this.data.schoolClass.externalId, this.schoolSubjectFormControl.value)
    );
    this.dialogRef.close();
  }
}
