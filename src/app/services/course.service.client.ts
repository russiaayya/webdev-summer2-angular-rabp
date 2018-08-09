import {Injectable} from '@angular/core';

@Injectable()
export class CourseServiceClient {
  // COURSE_URL = 'http://localhost:8080/api/course';
  COURSE_URL = 'http://webdev-summer2-2018-rabp.herokuapp.com/api/course';
  findAllCourses() {
  return fetch(this.COURSE_URL)
    .then(response => response.json());
  }
  findCourseById(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }
}
