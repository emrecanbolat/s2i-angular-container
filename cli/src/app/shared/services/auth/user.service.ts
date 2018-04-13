import {UtilitiesService} from '../utilities.service';

export class UserService {
  base = "http://127.0.0.1:3000/";
  timestamp: any;

  getUserFromToken() {
    let token = localStorage.getItem('token');
    let user = {};

    if (typeof token !== 'undefined' && token !== null) {
      let tokenJSON = JSON.parse(token);
      this.timestamp = tokenJSON.timestamp;

      if ( ((new Date().getTime() - this.timestamp) / 1000) > 1800) {
        this.changeUser(null);
        return null;
      }

      let encoded = tokenJSON.value.split('.')[1];
      user = JSON.parse(UtilitiesService.urlBase64Decode(encoded))
    } else return null;

    return user;
  }

  private changeUser(user) {
    if (user == null) {
      localStorage.removeItem('token');
    } else localStorage.setItem('token', user);
  }

  public isLoggedIn(): boolean {

    return this.getUserFromToken() != null;
  }

  public login(username, password) {
    return UtilitiesService.post(this.base + 'login', { username, password })
      .then(result => {
        let toStore = { value: result.token, timestamp: new Date().getTime() };
        localStorage.setItem('token', JSON.stringify(toStore));
      });
  }

  public signUp(user) {
    return UtilitiesService.post(this.base + 'sign_up', { user })
      .then( result => {
        let toStore = { value: result.token, timestamp: new Date().getTime() };
        localStorage.setItem('token', JSON.stringify(toStore));
      });
  }


}
