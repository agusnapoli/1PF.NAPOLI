import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models/students.model';

@Pipe({
  name: 'nameAndLastname',
  standalone: false
})
export class NameAndLastnamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    return `${value.lastname}, ${value.name}`;
  }

}
