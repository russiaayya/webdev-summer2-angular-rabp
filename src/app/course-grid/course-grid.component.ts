import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {Course} from '../models/course.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient) { }

  courses: Course[] = [];
  user: User = new User();
  enrolledCourses: Course[] = [];

  findEnrolledCourses(sections) {
    sections.forEach(section => {
      this.service.findCourseById(section.section.courseId)
        .then(course => {
          this.enrolledCourses.push(course);
        });
    });
  }

  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
    this.userService.profile()
      .then(user => {
        this.user = user;
      if (this.user.username) {
          this.sectionService.findSectionsForStudent()
            .then(sections => {this.findEnrolledCourses(sections); });
  }

}
