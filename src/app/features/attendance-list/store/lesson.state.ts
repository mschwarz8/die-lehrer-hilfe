import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { LessonService } from '../../attendance-list/services/lesson.service';
import { Lesson } from '../../attendance-list/models/lesson';
import {
  CreateLessonError,
  CreateLessonRequest,
  CreateLessonSuccess
} from '../../attendance-list/store/lesson.actions';
import { LessonStateModel } from '../../attendance-list/store/lesson.state.model';

export const initialLessonState: LessonStateModel = {
  lessons: [],
  createLessonRequestLoading: false,
  createLessonRequestError: null
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
  static isCreateNewLessonRequestLoading(state: LessonStateModel): boolean {
    return state.createLessonRequestLoading;
  }

  @Selector()
  static getCreateNewLessonRequestError(state: LessonStateModel): string {
    return state.createLessonRequestError;
  }

  // ACTION
  @Action(CreateLessonRequest)
  executeCreateLessonRequest(ctx: StateContext<LessonStateModel>, action: CreateLessonRequest): void {
    console.log('executeCreateLessonRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createLessonRequestLoading: true,
      createLessonRequestError: null
    });
    this.lessonService.createLesson(action.lessonTimestampInMs);
    ctx.dispatch(new CreateLessonSuccess({
      externalId: '957fd09d-6d97-4be5-a936-b325d1b5fb38',
      dateTimestampInMs: action.lessonTimestampInMs
    }));
  }

  @Action(CreateLessonSuccess)
  createLessonSuccess(ctx: StateContext<LessonStateModel>, action: CreateLessonSuccess): void {
    console.log('createLessonSuccess');
    const state = ctx.getState();
    const updatedLessons = produce(state.lessons, (draftLessons) => {
      draftLessons.push(action.lesson);
    });
    ctx.setState({
      ...state,
      lessons: updatedLessons,
      createLessonRequestLoading: false,
      createLessonRequestError: null
    });
  }

  @Action(CreateLessonError)
  createLessonError(ctx: StateContext<LessonStateModel>, action: CreateLessonError): void {
    console.log('createLessonError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createLessonRequestLoading: false,
      createLessonRequestError: action.error
    });
  }
}
