import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select } from '@ngxs/store';
import { UserState } from '../../../shared/user/store/user.state';
import { combineLatest, Observable } from 'rxjs';
import { SchoolClass } from '../../../shared/user/models/school-class';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-edit-school-class',
  templateUrl: './edit-school-class.component.html',
  styleUrls: ['./edit-school-class.component.scss']
})
export class EditSchoolClassComponent implements OnInit {
  public selectedExternalSchoolClassId: string;
  public selectedSchoolClass: SchoolClass;

  @Select(UserState.getAvailableSchoolClasses)
  public availableSchoolClasses$: Observable<SchoolClass[]>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedExternalSchoolClassId = params.externalSchoolClassId;
    });

    combineLatest([this.activatedRoute.params, this.availableSchoolClasses$])
      .pipe(distinctUntilChanged())
      .subscribe(([params, availableSchoolClasses]) => {
        this.selectedExternalSchoolClassId = params.externalSchoolClassId;
        if (!!this.selectedExternalSchoolClassId && !! availableSchoolClasses && availableSchoolClasses.length !== 0) {
          for (const availableSchoolClass of availableSchoolClasses) {
            if (this.selectedExternalSchoolClassId === availableSchoolClass.externalId) {
              this.selectedSchoolClass = availableSchoolClass;
            }
          }
        }
      });
  }
}
