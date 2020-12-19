import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { LessonService } from '../../attendance-list/services/lesson.service';
import { Lesson } from '../../attendance-list/models/lesson';
import {
  CreateLessonError,
  CreateLessonRequest,
  CreateLessonSuccess,
  LessonsFetchRequest,
  LessonsFetchRequestError,
  LessonsFetchRequestSuccess
} from '../../attendance-list/store/lesson.actions';
import { LessonStateModel } from '../../attendance-list/store/lesson.state.model';

export const initialLessonState: LessonStateModel = {
  lessons: [],
  lessonsFetchRequestLoading: false,
  lessonsFetchRequestError: null,
  createLessonRequestActionPerforming: false,
  createLessonRequestActionError: null
};

@State<LessonStateModel>({
  name: 'lesson',
  defaults: initialLessonState
})
@Injectable()
export class LessonState {
  constructor(private lessonService: LessonService) {}

  // SELECT
  @Selector()
  static getLessons(state: LessonStateModel): Lesson[] {
    return state.lessons;
  }

  @Selector()
  static getLessonsFetchRequestLoading(state: LessonStateModel): boolean {
    return state.lessonsFetchRequestLoading;
  }

  @Selector()
  static getLessonsFetchRequestError(state: LessonStateModel): string {
    return state.lessonsFetchRequestError;
  }

  @Selector()
  static isCreateNewLessonRequestLoading(state: LessonStateModel): boolean {
    return state.createLessonRequestActionPerforming;
  }

  @Selector()
  static getCreateNewLessonRequestError(state: LessonStateModel): string {
    return state.createLessonRequestActionError;
  }

  // ACTION
  @Action(LessonsFetchRequest)
  executeLessonsFetchRequest(ctx: StateContext<LessonStateModel>, action: LessonsFetchRequest): void {
    console.log('executeLessonsFetchRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      lessonsFetchRequestLoading: true,
      lessonsFetchRequestError: null
    });
    const lessons: Lesson[] = this.lessonService.fetchLessons(
      action.externalUserId,
      action.externalSchoolClassId,
      action.schoolSubject
    );
    ctx.dispatch(new LessonsFetchRequestSuccess(lessons));
  }

  @Action(LessonsFetchRequestSuccess)
  lessonsFetchRequestSuccess(ctx: StateContext<LessonStateModel>, action: LessonsFetchRequestSuccess): void {
    console.log('lessonsFetchRequestSuccess');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      lessons: action.lessons,
      lessonsFetchRequestLoading: false,
      lessonsFetchRequestError: null
    });
  }

  @Action(LessonsFetchRequestError)
  lessonsFetchRequestError(ctx: StateContext<LessonStateModel>, action: LessonsFetchRequestError): void {
    console.log('lessonsFetchRequestError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      lessons: null,
      lessonsFetchRequestLoading: false,
      lessonsFetchRequestError: action.error
    });
  }

  @Action(CreateLessonRequest)
  executeCreateLessonRequest(ctx: StateContext<LessonStateModel>, action: CreateLessonRequest): void {
    console.log('executeCreateLessonRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createLessonRequestActionPerforming: true,
      createLessonRequestActionError: null
    });
    this.lessonService.createLesson(action.lessonTimestampInMs);
    ctx.dispatch(
      new CreateLessonSuccess({
        externalId: '957fd09d-6d97-4be5-a936-b325d1b5fb38',
        dateTimestampInMs: action.lessonTimestampInMs
      })
    );
  }

  @Action(CreateLessonSuccess)
  createLessonSuccess(ctx: StateContext<LessonStateModel>, action: CreateLessonSuccess): void {
    console.log('createLessonSuccess');
    const state = ctx.getState();
    const updatedLessons = produce(state.lessons, draftLessons => {
      draftLessons.push(action.lesson);
    });
    ctx.setState({
      ...state,
      lessons: updatedLessons,
      createLessonRequestActionPerforming: false,
      createLessonRequestActionError: null
    });
  }

  @Action(CreateLessonError)
  createLessonError(ctx: StateContext<LessonStateModel>, action: CreateLessonError): void {
    console.log('createLessonError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createLessonRequestActionPerforming: false,
      createLessonRequestActionError: action.error
    });
  }
}
