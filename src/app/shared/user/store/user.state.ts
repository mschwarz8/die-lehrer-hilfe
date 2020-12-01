import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.state.model';
import {
  AvailableSchoolClassesFetchRequest, CreateSchoolClassError,
  CreateSchoolClassRequest,
  CreateSchoolClassSuccess,
  LoginUser,
  SelectSchoolClass
} from './user.actions';
import { User } from '../models/user';
import { SchoolClassService } from '../../services/school-class/school-class.service';
import { SchoolClass } from '../models/school-class';
import produce from 'immer';

export const initialUserState: UserStateModel = {
  loggedInUser: null,
  selectedSchoolClass: null,
  availableSchoolClasses: [],
  createNewSchoolClassRequestLoading: false,
  createNewSchoolClassRequestError: null
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
      availableSchoolClasses: [
        {
          externalId: '8ef72fda-fe14-4220-a3c2-71f68405c6ae',
          name: '7a',
          students: []
        },
        {
          externalId: '5eb5d76a-bb29-4419-83c3-ab87226886fc',
          name: '8b',
          students: []
        }
      ]
    });
  }

  @Action(SelectSchoolClass)
  executeSelectSchoolClass(ctx: StateContext<UserStateModel>, action: SelectSchoolClass): void {
    console.log('executeSelectSchoolClass');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedSchoolClass: action.selectedSchoolClass
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
    ctx.dispatch(new CreateSchoolClassSuccess({
      externalId: '957fd09d-6d97-4be5-a936-b325d1b5fb38',
      name: action.schoolClassname,
      students: action.students
    }));
  }

  @Action(CreateSchoolClassSuccess)
  executeCreateSchoolClassSuccess(ctx: StateContext<UserStateModel>, action: CreateSchoolClassSuccess): void {
    console.log('executeCreateSchoolClassSuccess');
    const state = ctx.getState();
    const updatedAvailableSchoolClasses = produce(state.availableSchoolClasses, (draftAvailableSchoolClasses) => {
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
}
