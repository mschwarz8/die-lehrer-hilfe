import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { SchoolClass } from '../../shared/user/models/school-class';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lesson } from './models/lesson';
import { CreateLessonRequest } from '../../features/attendance-list/store/lesson.actions';
import { LessonState } from '../../features/attendance-list/store/lesson.state';
import { SchoolSubjectEnum } from '@/app/shared/user/models/school-subject-enum';

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
  {
    externalId: 'bed0845c-31f3-46c4-81b3-0b5e71506d0e',
    firstName: 'Max',
    lastName: 'Bratwurst',
    lessons: [
      {
        externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
        tookPart: true,
        note: 'Was an idiot!'
      },
      {
        externalId: 'd3123a32-daa8-40e9-a21a-6af302399966',
        tookPart: true
      }
    ]
  },
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

const FIXED_LESSON_COLUMN_DESCRIPTIONS: string[] = [
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

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  public createNewLessonFormGroup: FormGroup | undefined;

  lessonColumnDescriptions: string[] = FIXED_LESSON_COLUMN_DESCRIPTIONS;

  createNewLessonMode = false;

  @Select(LessonState.getLessons)
  public lessons$: Observable<Lesson[]>;

  @Select(LessonState.isCreateNewLessonRequestLoading)
  public createNewLessonRequestLoading$: Observable<boolean>;

  stickyColumnDescriptions: string[] = ['firstName', 'lastName'];
  dataSource = STUDENTS_DATA;

  totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.lessonColumnDescriptions);

  @Select(UserState.getSelectedSchoolClass)
  public selectedSchoolClass$: Observable<SchoolClass>;

  @Select(UserState.getSelectedSchoolSubject)
  public selectedSchoolSubject$: Observable<SchoolSubjectEnum>;

  datePickerFilter = (date: Date | null): boolean => {
    return this.lessonColumnDescriptions.indexOf(date.valueOf().toString()) === -1;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createNewLessonFormGroup = this.fb.group({
      lessonDate: [new Date(), Validators.required]
    });

    const columnDescriptions: string[] = [];
    for (const lesson of LESSONS_DATA) {
      if (!columnDescriptions.includes(lesson.dateTimestampInMs.toString())) {
        columnDescriptions.push(lesson.dateTimestampInMs.toString());
      }
    }
    this.lessonColumnDescriptions = this.lessonColumnDescriptions.concat(columnDescriptions);
    // Sort by date
    this.lessonColumnDescriptions.sort((a, b) => (+a < +b ? -1 : 0));

    this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.lessonColumnDescriptions);

    this.lessons$.subscribe(lessons => {
      if (!lessons || lessons.length === 0) {
        return;
      }
      const lessonsColumnDescriptions = lessons.map(lesson => lesson.dateTimestampInMs.toString());
      this.lessonColumnDescriptions = FIXED_LESSON_COLUMN_DESCRIPTIONS.concat(lessonsColumnDescriptions);
      // Sort by date
      this.lessonColumnDescriptions.sort((a, b) => (+a < +b ? -1 : 0));
      this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(this.lessonColumnDescriptions);
    });
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

  public enterCreateNewLessonMode(): void {
    this.createNewLessonMode = true;
  }

  public lessonAlreadyPresent(): boolean {
    console.log(this.lessonDateFormControl.value.valueOf().toString());
    return this.lessonColumnDescriptions.indexOf(this.lessonDateFormControl.value.valueOf().toString()) !== -1;
  }

  public createNewLesson(): void {
    console.log('TODO: Erstelle neue Stunde...');
    this.store.dispatch(new CreateLessonRequest(this.lessonDateFormControl.value.valueOf()));
  }

  public getDateStringFromTimestamp(timestampInMsAsString: string): string {
    return new Date(+timestampInMsAsString).toLocaleDateString();
  }

  public get lessonDateFormControl(): FormControl {
    return this.createNewLessonFormGroup.get('lessonDate') as FormControl;
  }
}
