import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl} from '@angular/forms';
import {NetService} from '../../../../../shared/services/net.service';
import {AdminWord, Category, Word} from '../../../../../shared/model';
import {MediaService} from '../../../../../shared/services/media.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit, OnDestroy {

  hausaForm = new FormControl();
  englishForm = new FormControl();
  categoryForm = new FormControl();

  adding: any;
  removing: any;

  categories: any;
  tooltips = [
    'Please take care! If you change this word all other occurances with the same hausa word like this will be changed!',
    'Please keep in mind that you don\'t add another translation for the word by entering a different value than the current one!',
    'You can select or deselect a category. You are allowed to choose multiple categories, but you have to select at least one category!'
  ];

  constructor(public dialogRef: MatDialogRef<EditWordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private netService: NetService,
              private mediaService: MediaService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (!this.data) {
      this.data = {
        flag: true,
        entry_english: '',
        entry_hausa: '',
        medias: [ ],
        categories: [ ]
      } as AdminWord
    }

    this.netService.getAdminCategories()
      .then( (res) => {

        this.categories = res.map( (e, idx, arr) => {

          return {
            id: e.id,
            flag: e.flag,
            hausa: e.cat_hausa,
            english: e.cat_english,
            media: e.media_url + '.' + e.media_type
          } as Category;
        });

      });

    this.adding = this.mediaService.adding.subscribe( (item: any) => {
      this.data.medias.pushIfNotExist(item, (e) => { return e.id === item.id})
    });

    this.removing = this.mediaService.removing.subscribe( (item: any) => {
      for (const {element, index} of this.data.medias.map((element, index) => ({ element, index }))) {
        if (element.id && item.id && (element.id === item.id)) {
          this.data.medias.splice(index,1);
        } else {
          if (element.file === item.file) {
            this.data.medias.splice(index,1);
          }
        }
      }
    });

  }

  ngOnDestroy() {
    this.adding.unsubscribe();
    this.removing.unsubscribe();
  }

  public saveChanges() {
    if (!this.checkRequiredFields()) {
      this.netService.editWord(this.data)
        .then( (msg) => {
          if (msg === 'existing_hausa') {
            this.snackBar.open('There\'s already the same hausa word in the database!', null, { duration: 2000 });
          } else if (msg === 'existing_english') {
            this.snackBar.open('There\'s already the same english word in the database!', null, { duration: 2000 });
          }
          this.dialogRef.close(true);
        });
    }
  }

  public createWord() {
    if (!this.checkRequiredFields()) {
      this.netService.createWord(this.data)
        .then( msg => {
          this.dialogRef.close(true);
        })
    }

  }

  checkRequiredFields() {
    return this.data.entry_hausa === '' || this.data.entry_english === '' || this.data.categories.length === 0 || this.data.medias.length === 0;
  }

}
