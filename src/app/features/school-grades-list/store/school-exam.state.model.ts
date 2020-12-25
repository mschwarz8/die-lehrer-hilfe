import { SchoolExam } from '@/app/shared/user/models/school-exam';

export interface SchoolExamStateModel {
  schoolExams: SchoolExam[];
  schoolExamsFetchRequestLoading: boolean;
  schoolExamsFetchRequestError: string;
  addSchoolExamActionPerforming: boolean;
  addSchoolExamActionError: string;
}
