import { Student } from '../user/models/student';
import { SchoolClass } from '../../shared/user/models/school-class';
import { SchoolSubjectEnum } from '../../shared/user/models/school-subject-enum';
import { SchoolExam } from '../user/models/school-exam';
import { SchoolExamTypeEnum } from '../user/models/school-exam-type-enum';
import { Lesson } from '../../features/attendance-list/models/lesson';

export const mockedStudents: Student[] = [
  {
    externalId: 'bc0b4b9e-76c1-4ae0-9969-2b053f3fd3b9',
    firstName: 'Hans1',
    lastName: 'Wurst1'
  },
  {
    externalId: '242d356e-a224-4ebb-adcc-9f47745bf540',
    firstName: 'Hans2',
    lastName: 'Wurst2'
  },
  {
    externalId: '0310fc7c-a5b5-452e-85ef-b0bc7125ef90',
    firstName: 'Hans3',
    lastName: 'Wurst3'
  },
  {
    externalId: 'efe0fe51-0ab1-4fdc-a6f9-4c062f9172f7',
    firstName: 'Hans5',
    lastName: 'Wurst5'
  },
  {
    externalId: '1a7503a8-f1bc-4ec5-9aa3-7add73dfa8af',
    firstName: 'Hans6',
    lastName: 'Wurst6'
  },
  {
    externalId: '545cdf41-3b0a-4f23-82a9-3a490f7375dd',
    firstName: 'Hans7',
    lastName: 'Wurst7'
  },
  {
    externalId: 'aa9e3036-d83f-4c12-9f00-95bb2b2b8951',
    firstName: 'Hans8',
    lastName: 'Wurst8'
  },
  {
    externalId: '792922c1-a167-49c6-a0b4-ad3b3aaad63f',
    firstName: 'Hans9',
    lastName: 'Wurst9'
  },
  {
    externalId: 'b36e6e50-f731-4c68-a3dd-84f00abceb48',
    firstName: 'Hans10',
    lastName: 'Wurst10'
  }
];

export const mockedSchoolClasses: SchoolClass[] = [
  {
    externalId: '8ef72fda-fe14-4220-a3c2-71f68405c6ae',
    name: '7a',
    students: mockedStudents,
    schoolSubjects: [SchoolSubjectEnum.MATHE, SchoolSubjectEnum.SPORT]
  },
  {
    externalId: '5eb5d76a-bb29-4419-83c3-ab87226886fc',
    name: '8b',
    students: [],
    schoolSubjects: [SchoolSubjectEnum.MATHE]
  }
];

export const mockedSchoolExams: SchoolExam[] = [
  {
    name: 'Mitarbeitsnote',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    externalId: '2b20693f-2e25-4351-8dca-610351270cb8'
  },
  {
    name: '1. Schulaufgabe',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    externalId: '46865d07-ef99-45aa-b8a9-de047e62609f',
    dateTimestampInMs: new Date(2020, 9, 14).valueOf()
  },
  {
    name: '1. Stegreifaufgabe',
    type: SchoolExamTypeEnum.IMPROMPTU_TASK,
    externalId: 'a353300a-b859-479d-b492-d18d24ae08b4',
    dateTimestampInMs: new Date(2020, 9, 20).valueOf()
  },
  {
    name: '2. Stegreifaufgabe',
    type: SchoolExamTypeEnum.IMPROMPTU_TASK,
    externalId: 'd12a30fe-efe5-4087-aef9-b60c9ad8e9f3',
    dateTimestampInMs: new Date(2020, 9, 22).valueOf()
  },
  {
    name: '2. Schulaufgabe',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    externalId: '83864a61-c13e-4488-847a-30089fd24692',
    dateTimestampInMs: new Date(2020, 11, 2).valueOf()
  },
  {
    name: '3. Stegreifaufgabe',
    type: SchoolExamTypeEnum.IMPROMPTU_TASK,
    externalId: '99b4ffde-9458-4fb5-9527-6dea4dbfdd42',
    dateTimestampInMs: new Date(2021, 1, 10).valueOf()
  },
  {
    externalId: '14f45c70-28ae-4be1-b206-70d86c9da155',
    name: '1. Schulaufgabe',
    type: SchoolExamTypeEnum.SCHOOL_ASSIGNMENT,
    schoolLevel: '10+',
    participatedStudents: mockedStudents,
    schoolSubject: SchoolSubjectEnum.MATHE
  },
  {
    externalId: '14f45c70-28ae-4be1-b206-70d86c9da155',
    name: 'Ausfrage',
    type: SchoolExamTypeEnum.QUESTIONING,
    schoolLevel: '8',
    participatedStudents: [mockedStudents[0], mockedStudents[1]],
    schoolSubject: SchoolSubjectEnum.MATHE
  }
];

export const mockedLessons: Lesson[] = [
  {
    externalId: 'c97a4ce6-547d-4d6b-8621-a9917a333eac',
    dateTimestampInMs: new Date(2020, 10, 13).valueOf(),
    studentLessonInfos: [
      {
        externalStudentId: mockedStudents[0].externalId,
        tookPart: true,
        note: 'Was an idiot!'
      },
      {
        externalStudentId: mockedStudents[1].externalId,
        tookPart: true
      },
      {
        externalStudentId: mockedStudents[2].externalId,
        tookPart: true
      }
    ]
  },
  {
    externalId: '3ce93de8-ab72-4305-b9e6-6e430c3bd31e',
    dateTimestampInMs: new Date(2020, 10, 14).valueOf(),
    studentLessonInfos: [
      {
        externalStudentId: mockedStudents[2].externalId,
        tookPart: true,
        note: 'Hat Unterricht massiv gestört'
      },
      {
        externalStudentId: mockedStudents[3].externalId,
        tookPart: false,
        note: 'War entschuldigt'
      }
    ]
  },
  {
    externalId: '52d39682-1f67-4f40-bcaf-ac7cb0740441',
    dateTimestampInMs: new Date(2020, 10, 15).valueOf()
  },
  {
    externalId: '2c165919-e03d-43b3-998b-7bc946f636af',
    dateTimestampInMs: new Date(2020, 10, 16).valueOf()
  },
  {
    externalId: '15d058fa-8c15-46d6-9865-30d3de6fba1e',
    dateTimestampInMs: new Date(2020, 10, 17).valueOf()
  },
  {
    externalId: 'b30b1d29-f342-4bac-8deb-95a563fe45d8',
    dateTimestampInMs: new Date(2020, 10, 18).valueOf()
  },
  {
    externalId: '326c717d-ac5e-47f7-a087-630b12121b11',
    dateTimestampInMs: new Date(2020, 10, 19).valueOf()
  },
  {
    externalId: '78ad1596-6fa9-403e-ade3-d64c5361c838',
    dateTimestampInMs: new Date(2020, 10, 20).valueOf()
  },
  {
    externalId: 'd71a8ae9-c557-4ef0-8883-b14a4a5cf2fe',
    dateTimestampInMs: new Date(2020, 10, 21).valueOf()
  },
  {
    externalId: '2377f92f-1e84-463f-9632-9a81027c68af',
    dateTimestampInMs: new Date(2020, 10, 22).valueOf()
  }
];
