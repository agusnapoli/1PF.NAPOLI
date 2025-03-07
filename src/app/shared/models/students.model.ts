export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  courses?: string[]; // Cambiar a un array para permitir múltiples cursos


  perfil: 'desarrollador' | 'IT' | 'usuario final'; // Nuevo campo
  sexo: 'masculino' | 'femenino'; // Nuevo campo
}
