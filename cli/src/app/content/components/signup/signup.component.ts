import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../../shared/services/auth/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    'first_name': "",
    'last_name': "",
    'address': '',
    'username': "",
    'password': "",
    'key': ""
  };

  re_password: string;
  emailForm = new FormControl('', [Validators.required,Validators.pattern("[^ @]*@[^ @]*")])

  constructor(private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {}

  private onSubmit() {
    if (this.checkRequiredFields()) {
      this.snackBar.open('Please fill all required fields!', '',{
        duration: 2000,
      });
    } else {
      if (this.re_password !== this.user.password) {
        this.snackBar.open('Passwords do not match!', '',{
          duration: 2000,
        });
      } else {
        if (this.emailForm.valid) {
          this.userService.signUp(this.user)
            .then( () =>  this.router.navigate(['admin']));
        } else {
          this.snackBar.open('Please enter a valid email-address!!', '',{
            duration: 2000,
          });
        }
      }
    }
  }

  private checkRequiredFields() {
    return ( this.user.first_name == '' || this.user.last_name == '' || this.user.address == '' || this.user.username == '' ||
        this.user.password == '' || this.user.key == '' || this.re_password == '');
  }

}
