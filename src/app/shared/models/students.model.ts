export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  course: string;
  perfil: 'desarrollador' | 'IT' | 'usuario final'; // Nuevo campo
  sexo: 'masculino' | 'femenino'; // Nuevo campo
}
