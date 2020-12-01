import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { AvailableClassesFetchRequest, SelectClass } from '../../../shared/user/store/user.actions';
import { UserState } from '../../../shared/user/store/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  snav: MatSidenav;

  currentSelectedClassFormControl = new FormControl('');

  @Select(UserState.getAvailableClasses)
  public availableClasses$: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new AvailableClassesFetchRequest('bbf43adf-e1c1-4cb5-89a5-1a1a87ce6ac8'));
  }

  selectClass(selectedClass: string): void {
    console.log('Value changed ' + selectedClass);
    this.store.dispatch(new SelectClass(selectedClass));
  }

  sidenavToggleButtonClicked(): void {
    this.snav.toggle();
  }
}
