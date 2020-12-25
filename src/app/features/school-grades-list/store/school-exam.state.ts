import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SchoolExamStateModel } from '@/app/features/school-grades-list/store/school-exam.state.model';
import { SchoolExamService } from '@/app/features/school-grades-list/services/school-exam.service';
import {
  AddSchoolExamActionError,
  AddSchoolExamActionRequest, AddSchoolExamActionSuccess,
  SchoolExamsFetchError,
  SchoolExamsFetchRequest,
  SchoolExamsFetchSuccess
} from './school-exam.actions';
import { SchoolExam } from '@shared/user/models/school-exam';
import produce from 'immer';

export const initialSchoolExamState: SchoolExamStateModel = {
  schoolExams: [],
  schoolExamsFetchRequestLoading: false,
  schoolExamsFetchRequestError: null,
  addSchoolExamActionPerforming: false,
  addSchoolExamActionError: null
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

  @Selector()
  static isAddSchoolExamActionPerforming(state: SchoolExamStateModel): boolean {
    return state.addSchoolExamActionPerforming;
  }

  @Selector()
  static getAddSchoolExamActionError(state: SchoolExamStateModel): string {
    return state.addSchoolExamActionError;
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

  @Action(AddSchoolExamActionRequest)
  addSchoolExamActionRequest(ctx: StateContext<SchoolExamStateModel>, action: AddSchoolExamActionRequest): void {
    console.log('addSchoolExamActionRequest');
    console.log('Adding schoolExams for user ' + action.externalUserId + ' ...');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolExamActionPerforming: true,
      addSchoolExamActionError: null
    });
    const schoolExam: SchoolExam = this.schoolExamService.addSchoolExam(
      action.externalUserId,
      action.name,
      action.type,
      action.dateTimestampInMs
    );
    ctx.dispatch(new AddSchoolExamActionSuccess(schoolExam));
  }

  @Action(AddSchoolExamActionSuccess)
  addSchoolExamActionSuccess(ctx: StateContext<SchoolExamStateModel>, action: AddSchoolExamActionSuccess): void {
    console.log('addSchoolExamActionSuccess');
    const state = ctx.getState();
    const updatedSchoolExams = produce(state.schoolExams, draftSchoolExams => {
      draftSchoolExams.push(action.schoolExam);
    });
    ctx.setState({
      ...state,
      schoolExams: updatedSchoolExams,
      addSchoolExamActionPerforming: false,
      addSchoolExamActionError: null
    });
  }

  @Action(AddSchoolExamActionError)
  addSchoolExamActionError(ctx: StateContext<SchoolExamStateModel>, action: AddSchoolExamActionError): void {
    console.log('addSchoolExamActionError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      schoolExams: null,
      addSchoolExamActionPerforming: false,
      addSchoolExamActionError: action.error
    });
  }
}
