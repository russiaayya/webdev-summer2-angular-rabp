export class LessonServiceClient {
  COURSE_URL = 'http://webdev-summer2-2018-rabp.herokuapp.com/api/course/';
  // COURSE_URL = 'http://localhost:8080/api/course/';
  findLessonsForModule(courseId, moduleId) {
    return fetch(this.COURSE_URL + courseId + '/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
