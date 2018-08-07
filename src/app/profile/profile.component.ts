import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  user = {};
  username;
  password;
  firstName;
  lastName;
  phone;
  email;
  address;
  sections = [];

  update() {
    const user = {
      username: this.username,
      // password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      address: this.address
    };
    this.service.update(user)
      .then(() => {
        alert('User successfully updated');
      });
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.service
      .profile()
      .then(user => {
        this.username = user.username;
        // this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phone = user.phone;
        this.email = user.email;
        this.address = user.address;
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections );
  }

}
