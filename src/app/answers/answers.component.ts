import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizServiceClient} from '../services/quiz.service.client';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  submission = {};
  quizId = '';
  submissionId = '';
  questionAnswerMap = [];
  constructor(private route: ActivatedRoute,
              private quizService: QuizServiceClient) {}
  fillQuestionAnswer = submission => {
    this.questionAnswerMap = [];
    submission.answers.map((answer, index) => {
      const answerMap = this.createAnswerMap(answer, submission.quiz.questions[index]);
      this.questionAnswerMap.push({
        question: submission.quiz.questions[index],
        answer: answerMap.answer
      });
    });
  }
  createAnswerMap = (answer, question) => {
    switch (question.questionType) {
      case 'FILL_BLANKS':
        const keys = Object.keys(answer.fillBlanksAnswers);
        const answers = [];
        keys.map(key => {
          answers.push(answer.fillBlanksAnswers[key]);
        });
        return {answer: answers};
      case 'CHOICE':
        return {answer: question.choices[answer.multipleChoiceAnswer].text};
      case 'ESSAY':
        return {answer: answer.essayAnswer};
      case 'TRUE_FALSE':
        return {answer: answer.trueFalseAnswer};
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizId = params['quizId'];
      this.submissionId = params['submissionId'];
      this.quizService.findSubmissionById(this.quizId, this.submissionId)
        .then(submission => this.submission = submission)
        .then(() => this.fillQuestionAnswer(this.submission)); }
    );
  }

}
