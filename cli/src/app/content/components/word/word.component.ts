import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public word: any) { }

  ngOnInit() {
    console.log(this.word)
  }

  private getTranslations() {
    let translations = this.word.entries_english;
    let transString = '';
    translations.forEach( (translation, index) => {
      transString += translation.entry;

      if (translations.length-1 != index) {
        transString += ', ';
      }
    });
    return transString;
  }

}
