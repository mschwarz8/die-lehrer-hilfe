import { Injectable } from '@angular/core';
import { SchoolSubjectEnum } from '../../../shared/user/models/school-subject-enum';
import { SchoolExam } from '../../../shared/user/models/school-exam';
import { mockedSchoolExams } from '../../../shared/mocks/mocked-data';

@Injectable({
  providedIn: 'root'
})
export class SchoolExamService {

  constructor() { }

  public fetchSchoolExams(externalUserId: string,
                          externalSchoolClassId: string,
                          schoolSubject: SchoolSubjectEnum): SchoolExam[] {
    console.log('Fetching schoolExams');
    return mockedSchoolExams;
  }
}
