
import {Injectable} from '@angular/core';

@Injectable()
export class QuizServiceClient {
  QUIZ_URL = 'https://webdev-summer2-2018-rabp.herokuapp.com/';
  // QUIZ_URL = 'http://localhost:4000/';
  submitQuiz = quiz =>
    fetch(this.QUIZ_URL + 'api/quiz/' + quiz._id + '/submission', {
      method: 'post',
      body: JSON.stringify(quiz),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(response => response.json())
  loadAllSubmissions = quizId =>
    fetch(this.QUIZ_URL + 'api/quiz/' + quizId + '/submissions')
      .then(response => response.json())
  findSubmissionsForStudent = quizId =>
    fetch(this.QUIZ_URL + 'api/quiz/' + quizId + '/submission', {
      credentials: 'include'
    }).then(response => response.json())
  findSubmissionById = (quizId, submissionId) =>
    fetch(this.QUIZ_URL + 'api/quiz/' + quizId + '/submission/' + submissionId, {
      credentials: 'include'
    }).then(response => response.json())
  createQuiz(quiz) {}
  findAllQuizzes = () =>
    fetch(this.QUIZ_URL + 'api/quiz')
      .then(response => response.json())
  findQuizById = quizId =>
    fetch(this.QUIZ_URL + 'api/quiz/' + quizId)
      .then(response => response.json())
  updateQuiz(quizId, quiz) {}
  deleteQuiz(quizId) {}
}
