import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SchoolExamStateModel } from '../../../features/school-grades-list/store/school-exam.state.model';
import { SchoolExamService } from '../../../features/school-grades-list/services/school-exam.service';
import { SchoolExam } from '../../../shared/user/models/school-exam';
import {
  SchoolExamsFetchError,
  SchoolExamsFetchRequest,
  SchoolExamsFetchSuccess
} from './school-exam.actions';

export const initialSchoolExamState: SchoolExamStateModel = {
  schoolExams: [],
  schoolExamsFetchRequestLoading: false,
  schoolExamsFetchRequestError: null
};

@State<SchoolExamStateModel>({
  name: 'schoolExam',
  defaults: initialSchoolExamState
})
@Injectable()
export class SchoolExamState {
  constructor(private schoolExamService: SchoolExamService) {}

  // SELECT
  @Selector()
  static getSchoolExams(state: SchoolExamStateModel): SchoolExam[] {
    return state.schoolExams;
  }

  @Selector()
  static isSchoolExamsFetchRequestLoading(state: SchoolExamStateModel): boolean {
    return state.schoolExamsFetchRequestLoading;
  }

  @Selector()
  static getSchoolExamsFetchRequestError(state: SchoolExamStateModel): string {
    return state.schoolExamsFetchRequestError;
  }

  // ACTION
  @Action(SchoolExamsFetchRequest)
  executeSchoolExamsFetchRequest(ctx: StateContext<SchoolExamStateModel>, action: SchoolExamsFetchRequest): void {
    console.log('executeSchoolExamsFetchRequest');
    console.log('Fetching schoolExams for user ' + action.externalUserId + ' ...');
    const schoolExams: SchoolExam[] = this.schoolExamService.fetchSchoolExams(
      action.externalUserId,
      action.externalSchoolClassId,
      action.schoolSubject
    );
    ctx.dispatch(new SchoolExamsFetchSuccess(schoolExams));
  }

  @Action(SchoolExamsFetchSuccess)
  schoolExamsFetchSuccess(ctx: StateContext<SchoolExamStateModel>, action: SchoolExamsFetchSuccess): void {
    console.log('schoolExamsFetchSuccess');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      schoolExams: action.schoolExams,
      schoolExamsFetchRequestLoading: false,
      schoolExamsFetchRequestError: null
    });
  }

  @Action(SchoolExamsFetchError)
  schoolExamsFetchError(ctx: StateContext<SchoolExamStateModel>, action: SchoolExamsFetchError): void {
    console.log('schoolExamsFetchError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      schoolExams: null,
      schoolExamsFetchRequestLoading: false,
      schoolExamsFetchRequestError: action.error
    });
  }
}
