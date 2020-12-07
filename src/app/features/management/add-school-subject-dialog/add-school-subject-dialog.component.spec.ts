import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolSubjectDialogComponent } from './add-school-subject-dialog.component';

describe('AddSchoolSubjectDialogComponent', () => {
  let component: AddSchoolSubjectDialogComponent;
  let fixture: ComponentFixture<AddSchoolSubjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSchoolSubjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
