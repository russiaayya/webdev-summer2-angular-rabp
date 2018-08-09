export class TopicServiceClient {
  URL = 'https://webdev-summer2-2018-rabp.herokuapp.com';
  // URL = 'http://localhost:8080';
  findTopicsForLesson(courseId, moduleId, lessonId) {
    return fetch(this.URL + '/api/course/' + courseId + '/module/' + moduleId + '/lesson/' + lessonId + '/topic')
      .then(response => response.json());
  }
}
