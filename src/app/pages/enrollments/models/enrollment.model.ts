export interface Enrollment {
  id: string; // ID de la inscripción
  studentId: string; // ID del estudiante
  courseId: string; // ID del curso
  enrollmentDate: Date; // Fecha de inscripción
  userId: string; // ID del usuario que inscribió
}
