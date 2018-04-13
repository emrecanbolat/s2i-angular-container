import { Injectable } from '@angular/core';
import {UtilitiesService} from './utilities.service';
import { Word } from '../model';

@Injectable()
export class NetService {
  base = "http://127.0.0.1:3000/";

  constructor() { }

  public getRandomWords() {
    return UtilitiesService.get(this.base + 'random_words', null);
  }

  public getCategories(page) {
    return UtilitiesService.get(this.base + 'categories' + '?p=' + page)
  }

  public getWordsForCategory(id, page?) {
    let url = this.base + 'category/' + id;
    if ( page != null) { url += '?p=' + page; }
    return UtilitiesService.get(url)
  }

  public getAdminWords() {
    return UtilitiesService.post(this.base + 'admin', null, true)
      .then( ( results => {
        return results
      }));
  }

  public getAdminCategories() {
    return UtilitiesService.post(this.base + 'admin/categories', null, true)
      .then( ( results => {
        return results
      }));
  }

  public getAdminMedias() {
    return UtilitiesService.post(this.base + 'admin/medias', null, true)
      .then( ( results => {
        return results
      }));
  }

  public editWord(word: any) {
    return UtilitiesService.post( this.base + 'edit/word', word, true)
      .then( ( result => {
        return result
      }));
  }

  public createWord(word) {
    return UtilitiesService.post( this.base + 'create/word', word, true)
      .then( ( result => {
        return result
      }));
  }

  public editCategory(category: any) {
    return UtilitiesService.post( this.base + 'edit/category', category, true)
      .then( ( result => {
        return result
      }));
  }

  public createCategory(category) {
    return UtilitiesService.post( this.base + 'create/category', category, true)
      .then( ( result => {
        return result
      }));
  }

  public changeMediaFlag(item) {
    return UtilitiesService.post( this.base + 'edit/media', item, true)
      .then( ( result => {
        return result
      }));
  }

}
