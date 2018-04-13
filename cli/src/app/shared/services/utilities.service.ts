import {Subject} from 'rxjs/Subject';

export class UtilitiesService {

  public static urlBase64Decode(str) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  public static post(url, data?, auth?) {
    let content = { headers: { 'content-type': 'application/json' }, method: 'POST' };

    if (data) { content['body'] = JSON.stringify(data); }
    if (auth) { content.headers['authorization'] = 'Bearer ' + localStorage.token }

    return fetch(url, content).then(resp => resp.json());
  }

  public static get(url, data?, auth?) {
    if (auth) {
      return fetch(url, {
        body: data,
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + localStorage.token
        }}
      ).then(resp => resp.json());
    }
    return fetch(url, {
      body: data,
      headers: {
        'content-type': 'application/json'
      }}
    ).then(resp => resp.json());
  }

  subscription = new Subject();

  executeAction() {
    this.subscription.next();
  }

}
