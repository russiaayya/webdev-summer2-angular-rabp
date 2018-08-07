import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) { }

  username;
  password;
  password2;

  register(username, password, password2) {
    if (username && password) {
    this.service.findUserByUsername(username)
      .then((user) => {
        if (!user) {
          if (password === password2) {
            this.service
              .createUser(username, password)
              .then(() =>
                this.router.navigate(['profile']));
          } else {
            alert('Passwords do not match!');
          }
        } else {
          alert('Username already exists, pick another!');
        }
      });
    } else {
      alert('Username or passwords cannot be blank');
    }
  }


  ngOnInit() {
  }

}
