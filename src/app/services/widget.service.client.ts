export class WidgetServiceClient {
  findWidgetsForTopic(topicId) {
    return fetch('http://localhost:8080/api/topic/' + topicId + '/widget')
      .then(response => response.json());
  }
}
