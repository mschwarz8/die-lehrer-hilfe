import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.state.model';
import {
  AddSchoolSubjectActionError,
  AddSchoolSubjectActionRequest,
  AddSchoolSubjectActionSuccess, AddStudentActionError, AddStudentActionRequest, AddStudentActionSuccess,
  AvailableSchoolClassesFetchRequest,
  CreateSchoolClassActionError,
  CreateSchoolClassActionRequest,
  CreateSchoolClassActionSuccess,
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
import { Student } from '../models/student';

export const initialUserState: UserStateModel = {
  loggedInUser: null,
  selectedSchoolClass: null,
  selectedSchoolSubject: null,
  availableSchoolClasses: [],
  createNewSchoolClassRequestActionPerforming: false,
  createNewSchoolClassRequestActionError: null,
  addSchoolSubjectToSchoolClassActionPerforming: false,
  addSchoolSubjectToSchoolClassActionError: null,
  addStudentToSchoolClassActionPerforming: false,
  addStudentToSchoolClassActionError: null
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
    return state.createNewSchoolClassRequestActionPerforming;
  }

  @Selector()
  static getCreateNewSchoolClassRequestError(state: UserStateModel): string {
    return state.createNewSchoolClassRequestActionError;
  }

  @Selector()
  static isAddStudentToSchoolClassLoading(state: UserStateModel): boolean {
    return state.addStudentToSchoolClassActionPerforming;
  }

  @Selector()
  static getAddStudentToSchoolClassError(state: UserStateModel): string {
    return state.addStudentToSchoolClassActionError;
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
      selectedSchoolClass: mockedSchoolClasses[0],
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

  @Action(CreateSchoolClassActionRequest)
  executeCreateSchoolClassRequest(ctx: StateContext<UserStateModel>, action: CreateSchoolClassActionRequest): void {
    console.log('executeCreateSchoolClassRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createNewSchoolClassRequestActionPerforming: true,
      createNewSchoolClassRequestActionError: null
    });
    this.schoolClassService.createNewSchoolClass(action.schoolClassname, action.students);
    ctx.dispatch(
      new CreateSchoolClassActionSuccess({
        externalId: '957fd09d-6d97-4be5-a936-b325d1b5fb38',
        name: action.schoolClassname,
        students: action.students
      })
    );
  }

  @Action(CreateSchoolClassActionSuccess)
  executeCreateSchoolClassSuccess(ctx: StateContext<UserStateModel>, action: CreateSchoolClassActionSuccess): void {
    console.log('executeCreateSchoolClassSuccess');
    const state = ctx.getState();
    const updatedAvailableSchoolClasses = produce(state.availableSchoolClasses, draftAvailableSchoolClasses => {
      draftAvailableSchoolClasses.push(action.schoolClass);
    });
    ctx.setState({
      ...state,
      availableSchoolClasses: updatedAvailableSchoolClasses,
      createNewSchoolClassRequestActionPerforming: false,
      createNewSchoolClassRequestActionError: null
    });
  }

  @Action(CreateSchoolClassActionError)
  executeCreateSchoolClassError(ctx: StateContext<UserStateModel>, action: CreateSchoolClassActionError): void {
    console.log('executeCreateSchoolClassError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      createNewSchoolClassRequestActionPerforming: false,
      createNewSchoolClassRequestActionError: action.error
    });
  }

  @Action(AddSchoolSubjectActionRequest)
  executeAddSchoolSubjectRequest(ctx: StateContext<UserStateModel>, action: AddSchoolSubjectActionRequest): void {
    console.log('executeAddSchoolSubjectRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolSubjectToSchoolClassActionPerforming: true,
      addSchoolSubjectToSchoolClassActionError: null
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
    ctx.dispatch(new AddSchoolSubjectActionSuccess(updatedSchoolClass));
  }

  @Action(AddSchoolSubjectActionSuccess)
  addSchoolSubjectSuccess(ctx: StateContext<UserStateModel>, action: AddSchoolSubjectActionSuccess): void {
    console.log('addSchoolSubjectSuccess');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolSubjectToSchoolClassActionPerforming: false,
      addSchoolSubjectToSchoolClassActionError: null
    });
  }

  @Action(AddSchoolSubjectActionError)
  addSchoolSubjectError(ctx: StateContext<UserStateModel>, action: AddSchoolSubjectActionError): void {
    console.log('addSchoolSubjectError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addSchoolSubjectToSchoolClassActionPerforming: false,
      addSchoolSubjectToSchoolClassActionError: action.error
    });
  }

  @Action(AddStudentActionRequest)
  executeAddStudentActionRequest(ctx: StateContext<UserStateModel>, action: AddStudentActionRequest): void {
    console.log('executeAddStudentActionRequest');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addStudentToSchoolClassActionPerforming: true,
      addStudentToSchoolClassActionError: null
    });
    const createdStudent: Student =
      this.schoolClassService.addStudentToSchoolClass(action.externalSchoolClassId, action.firstName, action.lastName);
    ctx.dispatch(new AddStudentActionSuccess(action.externalSchoolClassId, createdStudent));
  }

  @Action(AddStudentActionSuccess)
  addStudentActionSuccess(ctx: StateContext<UserStateModel>, action: AddStudentActionSuccess): void {
    console.log('addStudentActionSuccess');
    const state = ctx.getState();
    let updatedSchoolClass: SchoolClass;
    const updatedAvailableSchoolClasses = produce(state.availableSchoolClasses, draftAvailableSchoolClasses => {
      for (const schoolClass of draftAvailableSchoolClasses) {
        if (schoolClass.externalId === action.externalSchoolClassId) {
          schoolClass.students.push(action.createdStudent);
          updatedSchoolClass = schoolClass;
        }
      }
    });
    ctx.setState({
      ...state,
      availableSchoolClasses: updatedAvailableSchoolClasses,
      addStudentToSchoolClassActionPerforming: false,
      addStudentToSchoolClassActionError: null
    });
  }

  @Action(AddStudentActionError)
  addStudentActionError(ctx: StateContext<UserStateModel>, action: AddStudentActionError): void {
    console.log('addStudentActionError');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      addStudentToSchoolClassActionPerforming: false,
      addStudentToSchoolClassActionError: action.error
    });
  }
}
