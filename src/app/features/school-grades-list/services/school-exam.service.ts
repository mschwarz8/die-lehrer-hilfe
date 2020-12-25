import { Injectable } from '@angular/core';
import { SchoolSubjectEnum } from '../../../shared/user/models/school-subject-enum';
import { SchoolExam } from '../../../shared/user/models/school-exam';
import { mockedSchoolExams } from '../../../shared/mocks/mocked-data';
import { SchoolExamTypeEnum } from '@shared/user/models/school-exam-type-enum';
import { Student } from '@shared/user/models/student';

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

  public addSchoolExam(externalUserId: string,
                       name: string,
                       type: SchoolExamTypeEnum,
                       dateTimestampInMs: number): SchoolExam {
    return {
      externalId: '34feda45-78ed-417a-9279-43ff4a7927d6',
      name,
      type,
      dateTimestampInMs
    };
  }
}
