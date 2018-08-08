import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  courses = [];
  selectedCourse = {};
  selectedModule = {};
  user: User = new User();

  constructor(private courseService: CourseServiceClient,
              private userService: UserServiceClient,
              private router: Router) { }

  selectCourse(course) {
    this.selectedCourse = course;
  }

  selectModule(module) {
    this.selectedModule = module;
  }

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.courseService
      .findAllCourses()
      .then(courses => this.courses = courses);
    this.userService.profile()
      .then(user => this.user = user);
  }

}
