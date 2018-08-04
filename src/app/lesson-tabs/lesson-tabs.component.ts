import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LessonServiceClient} from '../services/lesson.service.client';
import {Lesson} from '../models/lesson.model.client';

@Component({
  selector: 'app-lesson-tabs',
  templateUrl: './lesson-tabs.component.html',
  styleUrls: ['./lesson-tabs.component.css']
})
export class LessonTabsComponent implements OnInit {

  constructor(private service: LessonServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParam(params));
  }

  moduleId;
  courseId;
  lessonId;
  lessons: Lesson[] = [];

  setParam(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.loadLesosns(this.courseId, this.moduleId);
  }
  loadLesosns(courseId, moduleId) {
    this.moduleId = moduleId;
    this.courseId = courseId;
    console.log(moduleId);
    this.service.findLessonsForModule(courseId, moduleId)
      .then(lessons => this.lessons = lessons);
  }

  ngOnInit() {
  }

}
