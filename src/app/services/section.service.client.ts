import {Injectable} from '@angular/core';

@Injectable()
export class SectionServiceClient {

  // SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';
  // URL = 'http://localhost:4000';
  SECTION_URL = 'https://webdev-summer2-server-node-ra.herokuapp.com/api/course/COURSEID/section';
  URL = 'https://webdev-summer2-server-node-ra.herokuapp.com';

  findSectionsForStudent() {
    const url = this.URL + '/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = this.URL + '/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  disenrollStudentInSection(sectionId) {
    const url = this.URL + '/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  // createSection(courseId, name, seats) {
  //   const section = {courseId, name, seats};
  //   return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
  //     method: 'post',
  //     body: JSON.stringify(section),
  //     credentials: 'include',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   });
  // }
  createSection(section) {
    return fetch(this.SECTION_URL.replace('COURSEID', section.courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSection(sectionId, name, maxSeats, seats) {
    const section = {_id: sectionId, name: name, maxSeats: maxSeats, seats: seats};
    return fetch(this.URL + '/api/section/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteSection(sectionId) {
    console.log('delete: ' + sectionId);
    return fetch(this.URL + '/api/section/' + sectionId, {
      method: 'delete'
    });
  }
}
