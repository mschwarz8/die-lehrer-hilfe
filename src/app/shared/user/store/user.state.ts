import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.state.model';
import { AvailableClassesFetchRequest, LoginUser, SelectClass } from './user.actions';
import { User } from '../models/user';

export const initialUserState: UserStateModel = {
  loggedInUser: null,
  availableClasses: [],
  selectedClass: null
};

@State<UserStateModel>({
  name: 'user',
  defaults: initialUserState
})
@Injectable()
export class UserState {
  // constructor(private userService: UserService) {}

  // SELECT
  @Selector()
  static getLoggedInUser(state: UserStateModel): User {
    return state.loggedInUser;
  }

  @Selector()
  static getAvailableClasses(state: UserStateModel): string[] {
    return state.availableClasses;
  }

  @Selector()
  static getSelectedClass(state: UserStateModel): string {
    return state.selectedClass;
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

  @Action(AvailableClassesFetchRequest)
  executeAvailableClassesFetchRequest(ctx: StateContext<UserStateModel>, action: AvailableClassesFetchRequest): void {
    console.log('availableClassesFetchRequest');
    console.log('Fetching classes...');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableClasses: ['7a', '8b']
    });
  }

  @Action(SelectClass)
  executeSelectClass(ctx: StateContext<UserStateModel>, action: SelectClass): void {
    console.log('selectClass');
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedClass: action.selectedClass
    });
  }
}
