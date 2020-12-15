import { SchoolExam } from '../../../shared/user/models/school-exam';

export interface SchoolExamStateModel {
  schoolExams: SchoolExam[];
  schoolExamsFetchRequestLoading: boolean;
  schoolExamsFetchRequestError: string;
}
