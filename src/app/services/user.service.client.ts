export class UserServiceClient {
  // URL = 'https://webdev-summer2-server-node-ra.herokuapp.com';
  URL = 'http://localhost:4000';

  findUserById(userId) {
    return fetch(this.URL + '/api/user/' + userId)
      .then(response => response.json());
  }

  findUserByUsername(username) {
    return fetch(this.URL + '/api/user/' + username + '/username')
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch(this.URL + '/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  logout() {
    return fetch(this.URL + '/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch(this.URL + '/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch(this.URL + '/api/register', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  update(user) {
    return fetch(this.URL + '/api/profile', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
