import {Component, OnInit, ViewChild} from '@angular/core';
import {NetService} from '../../../shared/services/net.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatPaginator} from '@angular/material';
import {WordComponent} from '../word/word.component';

@Component({
  selector: 'app-category-word',
  templateUrl: './category-word.component.html',
  styleUrls: ['./category-word.component.css']
})
export class CategoryWordComponent implements OnInit {

  id: number;
  words: any;
  count: number;

  category_hausa: string;
  category_english: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private network: NetService, public dialog: MatDialog) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.network.getWordsForCategory(this.id).then( result => {
        this.words = result.words;
        this.count = result.count;

        this.category_hausa = this.words[0].category.cat_english;
        this.category_english = this.words[0].category.cat_hausa;
        console.log()
      })

    });

  }

  loadPage() {
    this.network.getWordsForCategory(this.id, this.paginator.pageIndex + 1).then( result => {
      this.words = Object.assign([], result.words);
    })
  }

  private getTranslations(translations) {
    let transString = '';
    translations.forEach( (translation, index) => {
      transString += translation.entry;

      if (translations.length-1 != index) {
        transString += ', ';
      }
    });
    return transString;
  }

  private openWord(word) {
    this.dialog.open(WordComponent, { data: word });
    console.log(word);
  }

}
