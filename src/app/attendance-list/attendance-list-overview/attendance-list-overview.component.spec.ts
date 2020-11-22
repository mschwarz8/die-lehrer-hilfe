import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceListOverviewComponent } from './attendance-list-overview.component';

describe('AttendanceListOverviewComponent', () => {
  let component: AttendanceListOverviewComponent;
  let fixture: ComponentFixture<AttendanceListOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceListOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceListOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
