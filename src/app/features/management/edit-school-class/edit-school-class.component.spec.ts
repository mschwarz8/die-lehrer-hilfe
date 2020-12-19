import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolClassComponent } from './edit-school-class.component';

describe('EditSchoolClassComponent', () => {
  let component: EditSchoolClassComponent;
  let fixture: ComponentFixture<EditSchoolClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchoolClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
