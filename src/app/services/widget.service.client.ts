export class WidgetServiceClient {
  URL = 'http://webdev-summer2-2018-rabp.herokuapp.com';
  // URL = 'http://localhost:8080';
  findWidgetsForTopic(topicId) {
    return fetch(this.URL + '/api/topic/' + topicId + '/widget')
      .then(response => response.json());
  }
}
