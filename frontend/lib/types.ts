export type Student = {id:number; full_name:string; email:string};
export type Course = {id:number; code:string; title:string; credits:number};
export type Enrollment = {
  id:number; student_id:number; course_id:number; enrolled_on:string;
  status:'active' | 'completed' | 'withdrawn';
};
export type EnrollmentDetail = Enrollment & {
  student_name:string; course_code:string; course_title:string;
};
