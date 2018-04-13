import {Component, OnInit, ViewChild} from '@angular/core';
import {NetService} from '../../../../shared/services/net.service';
import {AdminWord, Word} from '../../../../shared/model';
import {MatDialog, MatDialogRef, MatPaginator} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {EditWordComponent} from '../admin-edit/edit-word/edit-word.component';
import {UtilitiesService} from '../../../../shared/services/utilities.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  words: any;
  currentWords: any;
  sub: any;

  pageSize = 12;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private netService: NetService,
              public dialog: MatDialog,
              private utilities: UtilitiesService) {
    this.sub = this.utilities.subscription.subscribe( () => {
    this.loadData();
    })
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadData() {
    this.netService.getAdminWords()
      .then( (res) => {

        this.words = res.map( (e, idx, arr) => {

          return {
            id: e.id,
            flag: e.flag,
            entry_english: e.entry_english,
            entry_hausa: e.entry_hausa,
            medias: [ { file: e.media_url + '.' + e.media_type, id: e.media_id} ],
            categories: [ e.cat_id ]
          } as AdminWord;
        }).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
          .filter( (e, idx, arr) => {
            if (idx != 0 && e.id == arr[idx-1].id) {

              let element = arr.filter( ele => { return ele.id === e.id })[0];

              e.categories.forEach( (cat) => {
                element.categories.pushIfNotExist( cat, (ele) => {
                  return cat === ele } );
              });
              e.medias.forEach( (media) => {
                element.medias.pushIfNotExist( media, (ele) => { return media.id === ele.id } );
              });
              return false;
            } else {
              return true;
            }
          });

        this.currentWords = this.words.slice( 0, this.pageSize);
      });
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

  loadPage() {
    let start = this.paginator.pageIndex * this.pageSize;
    this.currentWords = this.words.slice( start, start + this.pageSize);
  }

  openEditDialog(word) {
    let dialogRef = this.dialog.open(EditWordComponent, {
      width: '1000px',
      data: word
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

}
