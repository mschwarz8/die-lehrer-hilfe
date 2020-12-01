import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOverviewComponent } from './management-overview.component';

describe('ManagementOverviewComponent', () => {
  let component: ManagementOverviewComponent;
  let fixture: ComponentFixture<ManagementOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
