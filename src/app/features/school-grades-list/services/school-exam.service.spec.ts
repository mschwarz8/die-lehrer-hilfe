import { TestBed } from '@angular/core/testing';

import { SchoolExamService } from './school-exam.service';

describe('SchoolExamService', () => {
  let service: SchoolExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
