import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizServiceClient} from '../services/quiz.service.client';

@Component({
  selector: 'app-quiz-taker',
  templateUrl: './quiz-taker.component.html',
  styleUrls: ['./quiz-taker.component.css']
})
export class QuizTakerComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private quizService: QuizServiceClient,
              private router: Router) { }

  quizId = ''
  quiz = {};

  submitQuiz = quiz =>
    this.quizService
      .submitQuiz(quiz)
      .then(submission => console.log(submission))
      .then(() => alert('Quiz submitted successfully'))
      .then(() => this.router.navigate(['quizzes']))
  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>
      this.quizService.findQuizById(params['quizId'])
        .then(quiz => this.quiz = quiz));
  }

}
