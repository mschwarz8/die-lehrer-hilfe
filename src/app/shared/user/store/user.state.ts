import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.state.model';
import {
  AddSchoolSubjectError,
  AddSchoolSubjectRequest, AddSchoolSubjectSuccess,
  AvailableSchoolClassesFetchRequest,
  CreateSchoolClassError,
  CreateSchoolClassRequest,
  CreateSchoolClassSuccess,
  LoginUser,
  SelectSchoolClass, SelectSchoolSubject
} from './user.actions';
import { User } from '../models/user';
import { SchoolClassService } from '../../services/school-class/school-class.service';
import { SchoolClass } from '../models/school-class';
import produce from 'immer';
import { SchoolSubjectEnum } from '../models/school-subject-enum';

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
      availableSchoolClasses: [
        {
          externalId: '8ef72fda-fe14-4220-a3c2-71f68405c6ae',
          name: '7a',
          students: [
            {
              externalId: 'bc0b4b9e-76c1-4ae0-9969-2b053f3fd3b9',
              firstName: 'Hans1',
              lastName: 'Wurst1'
            },
            {
              externalId: '242d356e-a224-4ebb-adcc-9f47745bf540',
              firstName: 'Hans2',
              lastName: 'Wurst2'
            },
            {
              externalId: '0310fc7c-a5b5-452e-85ef-b0bc7125ef90',
              firstName: 'Hans3',
              lastName: 'Wurst3'
            },
            {
              externalId: 'efe0fe51-0ab1-4fdc-a6f9-4c062f9172f7',
              firstName: 'Hans5',
              lastName: 'Wurst5'
            },
            {
              externalId: '1a7503a8-f1bc-4ec5-9aa3-7add73dfa8af',
              firstName: 'Hans6',
              lastName: 'Wurst6'
            },
            {
              externalId: '545cdf41-3b0a-4f23-82a9-3a490f7375dd',
              firstName: 'Hans7',
              lastName: 'Wurst7'
            },
            {
              externalId: 'aa9e3036-d83f-4c12-9f00-95bb2b2b8951',
              firstName: 'Hans8',
              lastName: 'Wurst8'
            },
            {
              externalId: '792922c1-a167-49c6-a0b4-ad3b3aaad63f',
              firstName: 'Hans9',
              lastName: 'Wurst9'
            },
            {
              externalId: 'b36e6e50-f731-4c68-a3dd-84f00abceb48',
              firstName: 'Hans10',
              lastName: 'Wurst10'
            }
          ],
          schoolSubjects: [SchoolSubjectEnum.MATHE, SchoolSubjectEnum.SPORT]
        },
        {
          externalId: '5eb5d76a-bb29-4419-83c3-ab87226886fc',
          name: '8b',
          students: [],
          schoolSubjects: [SchoolSubjectEnum.MATHE]
        }
      ],
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
    ctx.dispatch(
      new AddSchoolSubjectSuccess(updatedSchoolClass)
    );
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
