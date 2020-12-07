import { Injectable } from '@angular/core';
import { SchoolClass } from '../../user/models/school-class';
import { Student } from '../../user/models/student';
import { SchoolSubjectEnum } from '../../user/models/school-subject-enum';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  constructor() { }

  public createNewSchoolClass(schoolClassName: string, students: Student[]): SchoolClass {
    console.log('Creating new school class');
    return {
      externalId: '02eed61d-04b5-4412-9773-ea1bf7e1065e',
      name: schoolClassName,
      students
    };
  }

  public addSchoolSubjectToSchoolClass(externalSchoolClassId: string, schoolSubject: SchoolSubjectEnum): SchoolClass {
    console.log('Adding schoolSubject ' + schoolSubject + ' to schoolClass ' + externalSchoolClassId);
    return {
      externalId: externalSchoolClassId,
      name: 'schoolClassName',
      students: [],
      schoolSubjects: [schoolSubject]
    };
  }
}
