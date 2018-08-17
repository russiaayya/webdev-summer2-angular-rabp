import { Component, OnInit } from '@angular/core';
import {QuizServiceClient} from '../services/quiz.service.client';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-quiz-submissions',
  templateUrl: './quiz-submissions.component.html',
  styleUrls: ['./quiz-submissions.component.css']
})
export class QuizSubmissionsComponent implements OnInit {

  submissions = [];
  username = '';
  user = {};
  quizId = '';
  role = '';
  searchUsername = '';
  constructor(private quizService: QuizServiceClient,
              private route: ActivatedRoute,
              private userService: UserServiceClient) {
  }

  clearSearch() {
    this.quizService.loadAllSubmissions(this.quizId)
      .then(submissions => this.submissions = submissions);
    this.searchUsername = '';
  }

  convertDateTime(dateTime) {
    const dT = new Date(dateTime)
    const d = dT.toLocaleDateString()
    const  t = dT.toLocaleTimeString()
    const timeStamp = d + ' ' + t;
    return timeStamp;
  }

  filterByUsername() {
    this.quizService.loadAllSubmissions(this.quizId)
      .then(submissions => this.submissions = submissions)
      .then(() =>
        this.submissions = this.submissions.filter(submission => submission.username === this.searchUsername))
      .then(() => this.searchUsername = '');
  }

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     this.quizId = params['quizId'];
  //     this.quizService.loadAllSubmissions(this.quizId)
  //       .then(submissions => this.submissions = submissions); }
  //   );
  // }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizId = params['quizId'];
      this.userService.profile()
        .then(user => {
          this.username = user.username;
          this.role = user.role;
        }).then(() => {
        if (this.username === 'admin' || this.role === 'FACULTY' || this.role === 'ADMIN') {
          this.quizService.loadAllSubmissions(this.quizId)
            .then(submissions => this.submissions = submissions); } else {
          this.quizService.findSubmissionsForStudent(this.quizId)
            .then(submissions => this.submissions = submissions); }
        }
      );
      }
    );
  }
}
