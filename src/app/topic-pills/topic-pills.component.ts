import { Component, OnInit } from '@angular/core';
import {TopicServiceClient} from '../services/topic.service.client';
import {Topic} from '../models/topic.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topic-pills',
  templateUrl: './topic-pills.component.html',
  styleUrls: ['./topic-pills.component.css']
})
export class TopicPillsComponent implements OnInit {

  constructor(private service: TopicServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParam(params));
  }

  moduleId;
  courseId;
  lessonId;
  topicId;
  topics: Topic[] = [];

  setParam(params) {
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.topicId = params['topicId'];
    this.loadTopics(this.courseId, this.moduleId, this.lessonId);
  }
  loadTopics(courseId, moduleId, lessonId) {
    this.moduleId = moduleId;
    this.courseId = courseId;
    this.lessonId = lessonId;
    this.service.findTopicsForLesson(courseId, moduleId, lessonId)
      .then(topics => this.topics = topics);
  }

  ngOnInit() {
  }

}
