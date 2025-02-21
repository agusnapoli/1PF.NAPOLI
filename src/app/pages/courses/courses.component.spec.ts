import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CoursesService } from '../../core/courses.service';
import { AuthService } from '../../core/auth.service';
import { of } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const coursesService = jasmine.createSpyObj('CoursesService', ['getCourses', 'createCourse', 'updateCourse', 'deleteCourse']);
    const authService = jasmine.createSpyObj('AuthService', ['getAuthUser']);






    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [
        { provide: CoursesService, useValue: coursesService },
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    coursesServiceSpy = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.getAuthUser.and.returnValue(of({
      id: '1',
      name: 'Admin',
      email: 'admin@test.com',
      password: 'password',
      token: 'token',
      role: 'admin'
    }));






    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    const mockCourses = [{ id: '1', name: 'Course 1', description: 'Desc 1' }];
    coursesServiceSpy.getCourses.and.returnValue(of(mockCourses));

    component.ngOnInit();

    expect(coursesServiceSpy.getCourses).toHaveBeenCalled();
    expect(component.courses).toEqual(mockCourses);
  });

  it('should add new course', () => {
    const newCourse = { id: '', name: 'New Course', description: 'New Desc' };
    const createdCourse = { id: '1', name: 'New Course', description: 'New Desc' };
    coursesServiceSpy.createCourse.and.returnValue(of(createdCourse));

    component.addCourse(newCourse);

    expect(coursesServiceSpy.createCourse).toHaveBeenCalledWith(newCourse);
    expect(component.courses).toContain(createdCourse);
  });

  it('should delete course', () => {
    const courseToDelete = { id: '1', name: 'Course 1', description: 'Desc 1' };
    coursesServiceSpy.deleteCourse.and.returnValue(of(void 0));
    component.courses = [courseToDelete];

    component.deleteCourse(courseToDelete);

    expect(coursesServiceSpy.deleteCourse).toHaveBeenCalledWith(courseToDelete.id);
    expect(component.courses).not.toContain(courseToDelete);
  });

  it('should toggle form visibility', () => {
    expect(component.showForm).toBeFalse();

    component.toggleForm();
    expect(component.showForm).toBeTrue();

    component.toggleForm();
    expect(component.showForm).toBeFalse();
  });
});
