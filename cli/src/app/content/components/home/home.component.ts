import { Component, OnInit } from '@angular/core';

import { NetService } from '../../../shared/services/net.service';
import { MatDialog } from '@angular/material';
import { WordComponent } from '../word/word.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private network: NetService, public dialog: MatDialog) { }

  words: any[];

  ngOnInit() {

    this.network.getRandomWords().then( resp => {
      this.words = resp.words;
    })

  }

  public getTranslations(translations: any) {
    let wordString = '';
    translations.forEach( (value, index) => {
      wordString += value.entry;
      if (index != translations.length-1) {
        wordString += ', ';
      }
    });
    return wordString;
  }

  private openWord(id) {
    this.dialog.open(WordComponent, { data: id })
  }

}
