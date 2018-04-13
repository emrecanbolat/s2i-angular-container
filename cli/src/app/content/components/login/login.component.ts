import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../shared/services/auth/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  public login() {
    this.userService.login(this.username.value, this.password.value)
      .then( () =>  this.router.navigate(['admin']));
  }

}
