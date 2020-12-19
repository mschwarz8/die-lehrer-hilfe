import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../shared/user/store/user.state';
import { SchoolClass } from '../../shared/user/models/school-class';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lesson } from './models/lesson';
import { CreateLessonActionRequest, LessonsFetchRequest } from '../../features/attendance-list/store/lesson.actions';
import { LessonState } from '../../features/attendance-list/store/lesson.state';
import { SchoolSubjectEnum } from '../../shared/user/models/school-subject-enum';
import { User } from '../../shared/user/models/user';
import { distinctUntilChanged } from 'rxjs/operators';
import { Student } from '../../shared/user/models/student';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  public createNewLessonFormGroup: FormGroup | undefined;

  public createNewLessonMode = false;

  public selectedLessonDescription: string;

  public lessons: Lesson[];

  public stickyColumnDescriptions: string[] = ['firstName', 'lastName'];

  public totalColumnDescriptions: string[] = [];

  @Select(LessonState.getLessons)
  public lessons$: Observable<Lesson[]>;

  @Select(LessonState.isCreateNewLessonRequestLoading)
  public createNewLessonRequestLoading$: Observable<boolean>;

  @Select(UserState.getLoggedInUser)
  public loggedInUser$: Observable<User>;

  @Select(UserState.getSelectedSchoolClass)
  public selectedSchoolClass$: Observable<SchoolClass>;

  @Select(UserState.getSelectedSchoolSubject)
  public selectedSchoolSubject$: Observable<SchoolSubjectEnum>;

  public isDateDisabledFilter = (date: Date | null): boolean => {
    return this.lessons.map(lesson => lesson.dateTimestampInMs).indexOf(date.valueOf()) === -1;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createNewLessonFormGroup = this.fb.group({
      lessonDate: [new Date(), Validators.required]
    });

    this.lessons$.subscribe(lessons => {
      if (!lessons || lessons.length === 0) {
        this.lessons = [];
        return;
      }
      this.lessons = lessons;
      const lessonColumnDescriptions = lessons.map(lesson => lesson.dateTimestampInMs.toString());
      // Sort by date
      lessonColumnDescriptions.sort((a, b) => (+a < +b ? -1 : 0));
      this.totalColumnDescriptions = this.stickyColumnDescriptions.concat(lessonColumnDescriptions);
    });

    combineLatest([this.loggedInUser$, this.selectedSchoolClass$, this.selectedSchoolSubject$])
      .pipe(distinctUntilChanged())
      .subscribe(([loggedInUser, selectedSchoolClass, selectedSchoolSubject]) => {
        if (!!loggedInUser && !!selectedSchoolClass && !!selectedSchoolSubject) {
          this.store.dispatch(
            new LessonsFetchRequest(loggedInUser.externalId, selectedSchoolClass.externalId, selectedSchoolSubject)
          );
        }
      });
  }

  public hasStudentAttendedLessons(student: Student, lessonId: string): boolean {
    let foundLesson: Lesson = null;
    for (const lesson of this.lessons) {
      if (lesson.externalId === lessonId) {
        foundLesson = lesson;
      }
    }
    if (!foundLesson || !foundLesson.studentLessonInfos || foundLesson.studentLessonInfos.length === 0) {
      return false;
    }
    for (const studentLessonInfo of foundLesson.studentLessonInfos) {
      if (studentLessonInfo.externalStudentId === student.externalId) {
        return studentLessonInfo.tookPart;
      }
    }
    return false;
  }

  public enterCreateNewLessonMode(): void {
    this.createNewLessonMode = true;
  }

  public lessonAlreadyPresent(): boolean {
    return !this.isDateDisabledFilter(new Date(this.lessonDateFormControl.value.valueOf()));
  }

  public createNewLesson(): void {
    console.log('TODO: Erstelle neue Stunde...');
    this.store.dispatch(new CreateLessonActionRequest(this.lessonDateFormControl.value.valueOf()));
  }

  public getDateStringFromTimestamp(timestampInMsAsString: number): string {
    return new Date(timestampInMsAsString).toLocaleDateString();
  }

  public clickedOnHeader(lessonDescription: string): void {
    console.log('clicked on ' + lessonDescription);
    if (this.isColumnSelected(lessonDescription)) {
      this.selectedLessonDescription = null;
    } else {
      this.selectedLessonDescription = lessonDescription;
    }
  }

  public isColumnSelected(lessonDescription: string): boolean {
    return this.selectedLessonDescription === lessonDescription;
  }

  public get lessonDateFormControl(): FormControl {
    return this.createNewLessonFormGroup.get('lessonDate') as FormControl;
  }
}
