import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {CourseServiceClient} from '../services/course.service.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserServiceClient,
              private courseService: CourseServiceClient) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  courseTitle = '';
  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
    this.courseService
      .findCourseById(courseId)
      .then(course => this.courseTitle = course.title);
  }

  // createSection(sectionName, seats) {
  //   this
  //     .service
  //     .createSection(this.courseId, sectionName, seats)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }

  // createSection(sectionName, seats) {
  //   const section = {this.courseId, sectionName, seats};
  //   this
  //     .service
  //     .createSection(section)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }

  enroll(section) {
    // alert(section._id);
    this.service
      .enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
  }

}
