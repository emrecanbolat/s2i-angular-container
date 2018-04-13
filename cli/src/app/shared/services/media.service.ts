import {Subject} from 'rxjs/Subject';

export class MediaService {
  adding = new Subject();
  removing = new Subject();

  chooseMedia(item) {
    this.adding.next(item);
  }

  removeMedia(item) {
    this.removing.next(item);
  }
}
