import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {SectionServiceClient} from '../services/section.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {Section} from '../models/section.model.client';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  courses = [];
  sections = [];
  selectedCourse = {
    id: -1,
    title: ''
  };
  section = {};
  courseId = '';
  sectionName = '';
  maxSeats = '';
  selectedSectionId = '';
  selectedSection: Section;
  // selectedSection: {};

  constructor(private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private  userService: UserServiceClient,
              private router: Router) { }

  selectCourse = course => {
    this.courseId = course.id;
    this.sectionName = course.title + ' Section 1';
    this.selectedCourse = course;
    this.sectionService
      .findSectionsForCourse(course.id)
      .then(sections => this.sections = sections);
  }

  addSection = section => {
    if (this.selectedCourse.id === -1) {
      alert('Please select a course to add sections');
    } else {
      if (this.sectionName === '') {
        section.name = this.selectedCourse.title + ' Section 1';
      } else {
        section.name = this.sectionName;
      }
      section.courseId = this.selectedCourse.id;
      section.maxSeats = this.maxSeats;
      section.seats = this.maxSeats;
      this.sectionService
        .createSection(section)
        .then(() => {
          return this.sectionService
            .findSectionsForCourse(this.selectedCourse.id);
        })
        .then(sections => this.sections = sections);
      this.maxSeats = '';
    }
  }

  deleteSection(sectionId) {
    this.sectionService.deleteSection(sectionId)
      .then(() => {
        this.sectionService
          .findSectionsForCourse(this.courseId)
          .then(sections => this.sections = sections);
      });
  }
  updateSection(name, maxSeats) {
    const minSeats = this.selectedSection.maxSeats - this.selectedSection.seats;
    if (maxSeats < minSeats) {
      alert('Max seats cannot be less than ' + minSeats);
    } else {
    const seats = maxSeats - this.selectedSection.maxSeats + this.selectedSection.seats;
    this.sectionService
      .updateSection(this.selectedSection._id, name, maxSeats, seats)
      .then(() => {
        this.sectionService
          .findSectionsForCourse(this.courseId)
          .then(sections => this.sections = sections);
      });
    this.sectionName = '';
    this.maxSeats = '';
    // this.selectedSectionId = '';
    this.selectedSection = new Section();
    }
  }
  editSection(section) {
    this.sectionName = section.name;
    this.maxSeats = section.maxSeats;
    // this.selectedSectionId = section._id;
    this.selectedSection = section;
  }

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.courseService.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
