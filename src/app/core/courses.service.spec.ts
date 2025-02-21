import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiService = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        { provide: ApiService, useValue: apiService }
      ]
    });

    service = TestBed.inject(CoursesService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses', () => {
    const mockCourses = [{ id: '1', name: 'Course 1', description: 'Desc 1' }];
    apiServiceSpy.get.and.returnValue(of(mockCourses));

    service.getCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('courses');
  });

  it('should create course', () => {
    const newCourse = { id: '', name: 'New Course', description: 'New Desc' };
    const createdCourse = { id: '1', name: 'New Course', description: 'New Desc' };
    apiServiceSpy.post.and.returnValue(of(createdCourse));

    service.createCourse(newCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('courses', newCourse);
  });

  it('should update course', () => {
    const updatedCourse = { id: '1', name: 'Updated Course', description: 'Updated Desc' };
    apiServiceSpy.put.and.returnValue(of(updatedCourse));

    service.updateCourse('1', updatedCourse).subscribe(course => {
      expect(course).toEqual(updatedCourse);
    });

    expect(apiServiceSpy.put).toHaveBeenCalledWith('courses', '1', updatedCourse);
  });

  it('should delete course', () => {
    apiServiceSpy.delete.and.returnValue(of(void 0));

    service.deleteCourse('1').subscribe(() => {
      expect(true).toBeTrue();
    });

    expect(apiServiceSpy.delete).toHaveBeenCalledWith('courses', '1');
  });
});
