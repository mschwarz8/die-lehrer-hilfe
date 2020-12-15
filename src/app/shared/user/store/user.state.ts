import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.state.model';
import {
  AddSchoolSubjectError,
  AddSchoolSubjectRequest,
  AddSchoolSubjectSuccess,
  AvailableSchoolClassesFetchRequest,
  CreateSchoolClassError,
  CreateSchoolClassRequest,
  CreateSchoolClassSuccess,
  LoginUser,
  SelectSchoolClass,
  SelectSchoolSubject
} from './user.actions';
import { User } from '../models/user';
import { SchoolClassService } from '../../services/school-class/school-class.service';
import { SchoolClass } from '../models/school-class';
import produce from 'immer';
import { SchoolSubjectEnum } from '../models/school-subject-enum';
import { mockedSchoolClasses } from '../../mocks/mocked-data';

export const initialUserState: UserStateModel = {
  loggedInUser: null,
  selectedSchoolClass: null,
  selectedSchoolSubject: null,
  availableSchoolClasses: [],
  createNewSchoolClassRequestLoading: false,
  createNewSchoolClassRequestError: null,
  addSchoolSubjectToSchoolClassLoading: false,
  addSchoolSubjectToSchoolClassError: null
};

@State<UserStateModel>({
  name: 'user',
  defaults: initialUserState
})
@Injectable()
export class UserState {
  constructor(private schoolClassService: SchoolClassService) {}

  // SELECT
  @Selector()
  static getLoggedInUser(state: UserStateModel): User {
    return state.loggedInUser;
  }

  @Selector()
  static getSelectedSchoolClass(state: UserStateModel): SchoolClass {
    return state.selectedSchoolClass;
  }

  @Selector()
  static getSelectedSchoolSubject(state: UserStateModel): SchoolSubjectEnum {
    return state.selectedSchoolSubject;
  }

  @Selector()
  static getAvailableSchoolClasses(state: UserStateModel): SchoolClass[] {
    return state.availableSchoolClasses;
  }

  @Selector()
  static isCreateNewSchoolClassRequestLoading(state: UserStateModel): boolean {
    return state.createNewSchoolClassRequestLoading;
  }

  @Selector()
  static getCreateNewSchoolClassRequestError(state: UserStateModel): string {
    return state.createNewSchoolClassRequestError;
  }

  // ACTION
  @Action(LoginUser)
  executeLoginUser(ctx: StateContext<UserStateModel>, action: LoginUser): void {
    console.log('executeLoginUser');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loggedInUser: {
        externalId: action.externalId,
        firstName: action.firstName,
        lastName: action.lastName
      }
    });
  }

  @Action(AvailableSchoolClassesFetchRequest)
  executeAvailableSchoolClassesFetchRequest(
    ctx: StateContext<UserStateModel>,
    action: AvailableSchoolClassesFetchRequest
  ): void {
    console.log('executeAvailableSchoolClassesFetchRequest');
    console.log('Fetching classes for user ' + action.externalUserId + ' ...');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableSchoolClasses: mockedSchoolClasses,
      // For debugging selecting the first schoolClass
      selectedSchoolClass: {
        externalId: '5eb5d76a-bb29-4419-83c3-ab87226886fc',
        name: '8b',
        students: [],
        schoolSubjects: [SchoolSubjectEnum.MATHE]
      },
      // For debugging selecting the first schoolSubject
      selectedSchoolSubject: SchoolSubjectEnum.MATHE
    });
  }

  @Action(SelectSchoolClass)
  executeSelectSchoolClass(ctx: StateContext<UserStateModel>, action: SelectSchoolClass): void {
    console.log('executeSelectSchoolClass');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedSchoolClass: action.selectedSchoolClass,
      selectedSchoolSubject: null
    });
  }

  @Action(SelectSchoolSubject)
  executeSelectSchoolSubject(ctx: StateContext<UserStateModel>, action: SelectSchoolSubject): void {
    console.log('executeSelectSchoolSubject');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedSchoolSubject: action.selectedSchoolSubject
    });
  }

  @Action(CreateSchoolClassRequest)
  executeCreateSchoolClassRequest(ctx: StateContext<UserStateModel>, action: CreateSchoolClassRequest): void {
    console.log('executeCreateSchoolClassRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createNewSchoolClassRequestLoading: true,
      createNewSchoolClassRequestError: null
    });
    this.schoolClassService.createNewSchoolClass(action.schoolClassname, action.students);
    ctx.dispatch(
      new CreateSchoolClassSuccess({
        externalId: '957fd09d-6d97-4be5-a936-b325d1b5fb38',
        name: action.schoolClassname,
        students: action.students
      })
    );
  }

  @Action(CreateSchoolClassSuccess)
  executeCreateSchoolClassSuccess(ctx: StateContext<UserStateModel>, action: CreateSchoolClassSuccess): void {
    console.log('executeCreateSchoolClassSuccess');
    const state = ctx.getState();
    const updatedAvailableSchoolClasses = produce(state.availableSchoolClasses, draftAvailableSchoolClasses => {
      draftAvailableSchoolClasses.push(action.schoolClass);
    });
    ctx.setState({
      ...state,
      availableSchoolClasses: updatedAvailableSchoolClasses,
      createNewSchoolClassRequestLoading: false,
      createNewSchoolClassRequestError: null
    });
  }

  @Action(CreateSchoolClassError)
  executeCreateSchoolClassError(ctx: StateContext<UserStateModel>, action: CreateSchoolClassError): void {
    console.log('executeCreateSchoolClassError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createNewSchoolClassRequestLoading: false,
      createNewSchoolClassRequestError: action.error
    });
  }

  @Action(AddSchoolSubjectRequest)
  executeAddSchoolSubjectRequest(ctx: StateContext<UserStateModel>, action: AddSchoolSubjectRequest): void {
    console.log('executeAddSchoolSubjectRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolSubjectToSchoolClassLoading: true,
      addSchoolSubjectToSchoolClassError: null
    });
    this.schoolClassService.addSchoolSubjectToSchoolClass(action.externalSchoolClassId, action.schoolSubject);
    let updatedSchoolClass: SchoolClass;
    const updatedAvailableSchoolClasses = produce(state.availableSchoolClasses, draftAvailableSchoolClasses => {
      for (const schoolClass of draftAvailableSchoolClasses) {
        if (schoolClass.externalId === action.externalSchoolClassId) {
          schoolClass.schoolSubjects.push(action.schoolSubject);
          updatedSchoolClass = schoolClass;
        }
      }
    });
    ctx.setState({
      ...state,
      availableSchoolClasses: updatedAvailableSchoolClasses
    });
    ctx.dispatch(new AddSchoolSubjectSuccess(updatedSchoolClass));
  }

  @Action(AddSchoolSubjectSuccess)
  addSchoolSubjectSuccess(ctx: StateContext<UserStateModel>, action: AddSchoolSubjectSuccess): void {
    console.log('addSchoolSubjectSuccess');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolSubjectToSchoolClassLoading: false,
      addSchoolSubjectToSchoolClassError: null
    });
  }

  @Action(AddSchoolSubjectError)
  addSchoolSubjectError(ctx: StateContext<UserStateModel>, action: AddSchoolSubjectError): void {
    console.log('addSchoolSubjectError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolSubjectToSchoolClassLoading: false,
      addSchoolSubjectToSchoolClassError: action.error
    });
  }
}
