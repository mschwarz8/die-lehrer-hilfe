import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { combineLatest, Observable } from 'rxjs';
import { SchoolClass } from '../../shared/user/models/school-class';
import { SchoolSubjectEnum } from '../../shared/user/models/school-subject-enum';
import { SchoolExamTypeEnum } from '../../shared/user/models/school-exam-type-enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user/models/user';
import { AddSchoolExamActionRequest, SchoolExamsFetchRequest } from './store/school-exam.actions';
import { distinctUntilChanged } from 'rxjs/operators';
import { SchoolExamState } from './store/school-exam.state';
import { SchoolExam } from '../../shared/user/models/school-exam';

export interface StudentExam {
  externalId: string;
  tookPart: boolean;
  grade?: number;
  dateTimestampInMs?: number;
}

export interface Student {
  externalId: string;
  firstName: string;
  lastName: string;
  exams: StudentExam[];
}

const STUDENTS_DATA: Student[] = [
  {
    externalId: 'fc2a7d80-7a39-4579-a91f-d8816f5af075',
    firstName: 'Hans',
    lastName: 'Maier',
    exams: [
      {
        externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
        tookPart: true,
        grade: 1
      },
      {
        externalId: 'a353300a-b859-479d-b492-d18d24ae08b4',
        tookPart: false
      }
    ]
  },
  {
    externalId: 'bed0845c-31f3-46c4-81b3-0b5e71506d0e',
    firstName: 'Max',
    lastName: 'Bratwurst',
    exams: [
      {
        externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
        tookPart: true,
        grade: 4
      },
      {
        externalId: 'a353300a-b859-479d-b492-d18d24ae08b4',
        tookPart: true,
        grade: 5
      }
    ]
  },
  {
    externalId: '30682fab-daee-48f3-8395-6d820385bf59',
    firstName: 'Marry',
    lastName: 'VeryLongNameThatWontFit',
    exams: [
      {
        externalId: 'a353300a-b859-479d-b492-d18d24ae08b4',
        tookPart: true,
        grade: 3
      },
      {
        externalId: '2b20693f-2e25-4351-8dca-610351270cb8',
        tookPart: true,
        grade: 6,
        dateTimestampInMs: new Date(2020, 10, 22).valueOf()
      }
    ]
  }
];

@Component({
  selector: 'app-school-grades-list',
  templateUrl: './school-grades-list.component.html',
  styleUrls: ['./school-grades-list.component.scss']
})
export class SchoolGradesListComponent implements OnInit {
  public addNewGradeFormGroup: FormGroup | undefined;

  examColumnDescriptions: string[] = [];

  stickyColumnDescriptions: string[] = ['firstName', 'lastName'];
  students = STUDENTS_DATA;

  totalColumnDescriptions: string[] = [];

  schoolExamTypes: SchoolExamTypeEnum[] = Object.values(SchoolExamTypeEnum);

  private loggedInUser: User;

  private schoolExams: SchoolExam[] = [];

  @Select(SchoolExamState.getSchoolExams)
  public schoolExams$: Observable<SchoolExam[]>;

  @Select(SchoolExamState.isSchoolExamsFetchRequestLoading)
  public isSchoolExamsFetchRequestLoading$: Observable<boolean>;

  @Select(SchoolExamState.isAddSchoolExamActionPerforming)
  public isAddSchoolExamActionPerforming$: Observable<boolean>;

  @Select(SchoolExamState.getAddSchoolExamActionError)
  public addSchoolExamActionError: Observable<string>;

  @Select(UserState.getLoggedInUser)
  public loggedInUser$: Observable<User>;

  @Select(UserState.getSelectedSchoolClass)
  public selectedSchoolClass$: Observable<SchoolClass>;

  @Select(UserState.getSelectedSchoolSubject)
  public selectedSchoolSubject$: Observable<SchoolSubjectEnum>;

  addNewGradeMode = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.schoolExams$.subscribe(schoolExams => {
      if (!schoolExams || schoolExams.length === 0) {
        return;
      }
      this.schoolExams = schoolExams;
      const columnDescriptions: string[] = [];
      for (const exam of this.schoolExams) {
        if (!columnDescriptions.includes(exam.externalId)) {
          columnDescriptions.push(exam.externalId);
        }
      }
      this.examColumnDescriptions = columnDescriptions;

      this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.examColumnDescriptions);

      this.totalColumnDescriptions.push('totalGrade');
    });

    this.addNewGradeFormGroup = this.fb.group({
      gradeName: [null, Validators.required],
      gradeType: [null, Validators.required],
      gradeDate: new Date()
    });

    combineLatest([this.loggedInUser$, this.selectedSchoolClass$, this.selectedSchoolSubject$])
      .pipe(distinctUntilChanged())
      .subscribe(([loggedInUser, selectedSchoolClass, selectedSchoolSubject]) => {
        this.loggedInUser = loggedInUser;
        if (!!loggedInUser && !!selectedSchoolClass && !!selectedSchoolSubject) {
          this.store.dispatch(
            new SchoolExamsFetchRequest(loggedInUser.externalId, selectedSchoolClass.externalId, selectedSchoolSubject)
          );
        }
      });
  }

  public getTooltipForStudentExam(student: Student, externalExamId: string): string {
    const examIndex = student.exams.findIndex(examData => examData.externalId === externalExamId);
    if (examIndex !== -1 && !!student.exams[examIndex].dateTimestampInMs) {
      return new Date(student.exams[examIndex].dateTimestampInMs).toLocaleDateString();
    }
    return '';
  }

  public getGradeForStudentExam(student: Student, externalExamId: string): string {
    const examIndex = student.exams.findIndex(examData => examData.externalId === externalExamId);
    if (examIndex !== -1 && !!student.exams[examIndex].grade) {
      return student.exams[examIndex].grade.toString();
    }
    return '-';
  }

  public getTotalGrade(student: Student): number {
    let gradeSum = 0;
    let numberOfGrades = 0;
    for (const exam of student.exams) {
      const examIndex = this.schoolExams.findIndex(examData => examData.externalId === exam.externalId);
      if (examIndex !== -1 && !!exam.grade) {
        const examObject = this.schoolExams[examIndex];
        let gradeWeight = 1;
        if (examObject.type === SchoolExamTypeEnum.SCHOOL_ASSIGNMENT) {
          gradeWeight = 3;
        }
        numberOfGrades = numberOfGrades + gradeWeight;
        gradeSum = gradeSum + exam.grade * gradeWeight;
      }
    }
    if (numberOfGrades === 0) {
      return 0;
    }
    return gradeSum / numberOfGrades;
  }

  public enterAddNewGradeMode(): void {
    this.addNewGradeMode = true;
  }

  public addNewGrade(): void {
    console.log('Should add new grade here...');
    console.log(this.addNewGradeNameFormControl.value);
    console.log(this.addNewGradeTypeFormControl.value);
    console.log(this.addNewGradeDateFormControl.value);
    if (!!this.loggedInUser && !!this.loggedInUser.externalId) {
      this.store.dispatch(
        new AddSchoolExamActionRequest(
          this.loggedInUser.externalId,
          this.addNewGradeNameFormControl.value,
          this.addNewGradeTypeFormControl.value,
          this.addNewGradeDateFormControl.value
        )
      );
    }
  }

  public addNewGradeButtonDisabled(): boolean {
    return (
      !this.addNewGradeNameFormControl.valid ||
      !this.addNewGradeTypeFormControl.valid ||
      !this.addNewGradeDateFormControl.valid
    );
  }

  public get addNewGradeNameFormControl(): FormControl {
    return this.addNewGradeFormGroup.get('gradeName') as FormControl;
  }

  public get addNewGradeTypeFormControl(): FormControl {
    return this.addNewGradeFormGroup.get('gradeType') as FormControl;
  }

  public get addNewGradeDateFormControl(): FormControl {
    return this.addNewGradeFormGroup.get('gradeDate') as FormControl;
  }
}
