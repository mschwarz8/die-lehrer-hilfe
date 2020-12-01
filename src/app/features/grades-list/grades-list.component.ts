import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { Observable } from 'rxjs';

export interface Exam {
  name: string;
  type: string; // Ausfrage, Stegreifaufgabe, Schulaufgabe
  externalId: string;
  dateTimestampInMs: number;
}

export interface StudentExam {
  externalId: string;
  tookPart: boolean;
  grade?: number;
}

export interface Student {
  externalId: string;
  firstName: string;
  lastName: string;
  exams: StudentExam[];
}

const EXAM_DATA: Exam[] = [
  {
    name: '1. Schulaufgabe',
    type: 'Schulaufgabe',
    externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
    dateTimestampInMs: new Date(2020, 9, 14).valueOf()
  },
  {
    name: '1. Stegreifaufgabe',
    type: 'Stegreifaufgabe',
    externalId: 'a353300a-b859-479d-b492-d18d24ae08b4',
    dateTimestampInMs: new Date(2020, 9, 20).valueOf()
  },
  {
    name: '2. Stegreifaufgabe',
    type: 'Stegreifaufgabe',
    externalId: 'd12a30fe-efe5-4087-aef9-b60c9ad8e9f3',
    dateTimestampInMs: new Date(2020, 9, 22).valueOf()
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
      }
    ]
  }
];

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent implements OnInit {
  examColumnDescriptions: string[] = [];

  stickyColumnDescriptions: string[] = ['firstName', 'lastName'];
  dataSource = STUDENTS_DATA;
  examData = EXAM_DATA;

  totalColumnDescriptions: string[] = [];

  @Select(UserState.getSelectedClass)
  public selectedClass$: Observable<string>;

  constructor() {}

  ngOnInit(): void {
    const columnDescriptions: string[] = [];
    for (const exam of EXAM_DATA) {
      if (!columnDescriptions.includes(exam.dateTimestampInMs.toString())) {
        columnDescriptions.push(exam.externalId);
      }
    }
    this.examColumnDescriptions = columnDescriptions;

    this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.examColumnDescriptions);

    this.totalColumnDescriptions.push('totalGrade');
  }

  public getGradeForStudentExam(student: Student, externalExamId: string): string {
    const examIndex = student.exams.findIndex((examData) => examData.externalId === externalExamId);
    if (examIndex !== -1 && !!student.exams[examIndex].grade) {
      return student.exams[examIndex].grade.toString();
    }
    return '-';
  }

  public getTotalGrade(student: Student): number {
    let gradeSum = 0;
    let numberOfGrades = 0;
    console.log(student.firstName + ' ' + student.lastName);
    for (const exam of student.exams) {
      const examIndex = EXAM_DATA.findIndex((examData) => examData.externalId === exam.externalId);
      if (examIndex !== -1 && !!exam.grade) {
        const examObject = EXAM_DATA[examIndex];
        let gradeWeight = 1;
        if ( examObject.type === 'Schulaufgabe') {
          gradeWeight = 3;
        }
        numberOfGrades = numberOfGrades + gradeWeight;
        gradeSum = gradeSum + (exam.grade * gradeWeight);
      }
      console.log(gradeSum);
      console.log(numberOfGrades);
    }
    if (numberOfGrades === 0) {
      return 0;
    }
    return gradeSum / numberOfGrades;
  }
}
