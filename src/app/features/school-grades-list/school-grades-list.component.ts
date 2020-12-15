import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { combineLatest, Observable } from 'rxjs';
import { SchoolClass } from '../../shared/user/models/school-class';
import { SchoolSubjectEnum } from '../../shared/user/models/school-subject-enum';
import { SchoolExamTypeEnum } from '../../shared/user/models/school-exam-type-enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user/models/user';
import { SchoolExamsFetchRequest } from './store/school-exam.actions';
import { distinctUntilChanged } from 'rxjs/operators';

export interface Exam {
  name: string;
  type: SchoolExamTypeEnum;
  externalId: string;
  dateTimestampInMs?: number; // For type QUESTIONING and COLLABORATION not needed
}

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

const EXAM_DATA: Exam[] = [
  {
    name: 'Mitarbeitsnote',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    externalId: '2b20693f-2e25-4351-8dca-610351270cb8'
  },
  {
    name: '1. Schulaufgabe',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
    dateTimestampInMs: new Date(2020, 9, 14).valueOf()
  },
  {
    name: '1. Stegreifaufgabe',
    type: SchoolExamTypeEnum.IMPROMPTU_TASK,
    externalId: 'a353300a-b859-479d-b492-d18d24ae08b4',
    dateTimestampInMs: new Date(2020, 9, 20).valueOf()
  },
  {
    name: '2. Stegreifaufgabe',
    type: SchoolExamTypeEnum.IMPROMPTU_TASK,
    externalId: 'd12a30fe-efe5-4087-aef9-b60c9ad8e9f3',
    dateTimestampInMs: new Date(2020, 9, 22).valueOf()
  },
  {
    name: '2. Schulaufgabe',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    externalId: '83864a61-c13e-4488-847a-30089fd24692',
    dateTimestampInMs: new Date(2020, 11, 2).valueOf()
  },
  {
    name: '3. Stegreifaufgabe',
    type: SchoolExamTypeEnum.IMPROMPTU_TASK,
    externalId: '99b4ffde-9458-4fb5-9527-6dea4dbfdd42',
    dateTimestampInMs: new Date(2021, 1, 10).valueOf()
  }
];

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
  examData = EXAM_DATA;

  totalColumnDescriptions: string[] = [];

  schoolExamTypes: SchoolExamTypeEnum[] = Object.values(SchoolExamTypeEnum);

  @Select(UserState.getLoggedInUser)
  public loggedInUser$: Observable<User>;

  @Select(UserState.getSelectedSchoolClass)
  public selectedSchoolClass$: Observable<SchoolClass>;

  @Select(UserState.getSelectedSchoolSubject)
  public selectedSchoolSubject$: Observable<SchoolSubjectEnum>;

  addNewGradeMode = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    const columnDescriptions: string[] = [];
    for (const exam of EXAM_DATA) {
      if (!columnDescriptions.includes(exam.externalId)) {
        columnDescriptions.push(exam.externalId);
      }
    }
    this.examColumnDescriptions = columnDescriptions;

    this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.examColumnDescriptions);

    this.totalColumnDescriptions.push('totalGrade');

    this.addNewGradeFormGroup = this.fb.group({
      gradeName: [null, Validators.required],
      gradeType: [null, Validators.required],
      gradeDate: new Date()
    });

    combineLatest([this.loggedInUser$, this.selectedSchoolClass$, this.selectedSchoolSubject$])
      .pipe(distinctUntilChanged())
      .subscribe(([loggedInUser, selectedSchoolClass, selectedSchoolSubject]) => {
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
      const examIndex = EXAM_DATA.findIndex(examData => examData.externalId === exam.externalId);
      if (examIndex !== -1 && !!exam.grade) {
        const examObject = EXAM_DATA[examIndex];
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
