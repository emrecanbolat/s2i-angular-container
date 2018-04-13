import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class OnlyLoggedInUserGuard implements CanActivate {

  constructor( private userService: UserService, private router: Router ) {}

  canActivate() {
    return true;
    if (this.userService.isLoggedIn()) {
      return true;
    } else
      this.router.navigate(['login']);
      return false;
  }
}
