export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  course: string;
  phone?: string;
  address?: string;
  courses?: string[]; // IDs de los cursos en los que está inscrito
}
