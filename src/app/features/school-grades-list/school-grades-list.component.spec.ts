import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGradesListComponent } from './school-grades-list.component';

describe('GradesListComponent', () => {
  let component: SchoolGradesListComponent;
  let fixture: ComponentFixture<SchoolGradesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGradesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
