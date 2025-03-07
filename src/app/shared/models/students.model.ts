export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  courses?: string[];

  perfil: 'desarrollador' | 'IT' | 'usuario final';
  sexo: 'masculino' | 'femenino';
}
