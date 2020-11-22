import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

export interface Lesson {
  externalId: string;
  dateTimestampInMs: number;
}

export interface StudentLesson {
  externalId: string;
  tookPart: boolean;
  note?: string;
}

export interface Student {
  externalId: string;
  firstName: string;
  lastName: string;
  lessons: StudentLesson[];
}

const LESSONS_DATA: Lesson[] = [
  {
    externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
    dateTimestampInMs: new Date(2020, 9, 14).valueOf()
  },
  {
    externalId: 'd3123a32-daa8-40e9-a21a-6af302399966',
    dateTimestampInMs: new Date(2020, 9, 15).valueOf()
  }
];

const STUDENTS_DATA: Student[] = [
  {
    externalId: 'fc2a7d80-7a39-4579-a91f-d8816f5af075',
    firstName: 'Hans',
    lastName: 'Maier',
    lessons: [
      {
        externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
        tookPart: true,
        note: 'Hat Unterricht massiv gestört'
      },
      {
        externalId: 'd3123a32-daa8-40e9-a21a-6af302399966',
        tookPart: false,
        note: 'War entschuldigt'
      }
    ]
  },
  { externalId: 'bed0845c-31f3-46c4-81b3-0b5e71506d0e', firstName: 'Max', lastName: 'Bratwurst', lessons: [
      {
        externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
        tookPart: true,
        note: 'Was an idiot!'
      },
      {
        externalId: 'd3123a32-daa8-40e9-a21a-6af302399966',
        tookPart: true,
      }
    ] },
  {
    externalId: '30682fab-daee-48f3-8395-6d820385bf59',
    firstName: 'Marry',
    lastName: 'VeryLongNameThatWontFit',
    lessons: [
      {
        externalId: 'd3123a32-daa8-40e9-a21a-6af302399966',
        tookPart: true
      }
    ]
  }
];

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  lessonColumnDescriptions: string[] = [
    new Date(2020, 10, 13).valueOf().toString(),
    new Date(2020, 10, 14).valueOf().toString(),
    new Date(2020, 10, 15).valueOf().toString(),
    new Date(2020, 10, 16).valueOf().toString(),
    new Date(2020, 10, 17).valueOf().toString(),
    new Date(2020, 10, 18).valueOf().toString(),
    new Date(2020, 10, 19).valueOf().toString(),
    new Date(2020, 10, 20).valueOf().toString(),
    new Date(2020, 10, 21).valueOf().toString(),
    new Date(2020, 10, 22).valueOf().toString()
  ];

  stickyColumnDescriptions: string[] = ['firstName', 'lastName'];
  dataSource = STUDENTS_DATA;

  totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.lessonColumnDescriptions);

  constructor() {}

  ngOnInit(): void {
    // this.totalColumnDescriptions.push('actionColumn');
    const columnDescriptions: string[] = [];
    for (const lesson of LESSONS_DATA) {
      if (!columnDescriptions.includes(lesson.dateTimestampInMs.toString())) {
        columnDescriptions.push(lesson.dateTimestampInMs.toString());
      }
    }
    this.lessonColumnDescriptions = this.lessonColumnDescriptions.concat(columnDescriptions);
    // Sort by date
    this.lessonColumnDescriptions.sort((a, b) => +a < +b ? -1 : 0);

    this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.lessonColumnDescriptions);
  }

  public hasStudentAttendedLessons(student: Student, lessonDescription: string): boolean {
    let foundLesson = null;
    for (const lesson of LESSONS_DATA) {
      if (lesson.dateTimestampInMs.toString() === lessonDescription) {
        foundLesson = lesson;
      }
    }
    if (!foundLesson) {
      return false;
    }
    for (const takenLesson of student.lessons) {
      if (takenLesson.externalId === foundLesson.externalId) {
        return takenLesson.tookPart;
      }
    }
    return false;
  }

  public getDateStringFromTimestamp(timestampInMsAsString: string): string {
    return new Date(+timestampInMsAsString).toLocaleDateString();
  }

  // private fromTimestampToMMYYYY(fromTimestamp: number): string {
  //   const fromDate: Date = new Date(fromTimestamp);
  //   let fromMonthNumber = fromDate.getUTCMonth() + 1;
  //   let fromMonthString = "" + fromMonthNumber;
  //   if (fromMonthNumber < 10) {
  //     fromMonthString = "0" + fromMonthString;
  //   }
  //   return fromMonthString + "/" + fromDate.getUTCFullYear();
  // }
}
