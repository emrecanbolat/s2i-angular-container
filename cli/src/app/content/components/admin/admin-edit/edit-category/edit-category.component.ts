import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {NetService} from '../../../../../shared/services/net.service';
import {FormControl} from '@angular/forms';
import {Cmyk} from 'ngx-color-picker';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  hausaForm = new FormControl();
  englishForm = new FormControl();
  color: string;

  tooltips = [
    'Please take care! If you change this word all other occurances with the same hausa word like this will be changed!',
    'Please keep in mind that you don\'t add another translation for the word by entering a different value than the current one!',
    'You can select or deselect a category. You are allowed to choose multiple categories, but you have to select at least one category!'
  ];

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private netService: NetService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (!this.data) {
      this.data = {
        hausa: '',
        english: '',
        color: '#FFFFFF',
        media: null,
        media_id: null
      }
    }

    this.color = this.data.color;
  }

  public saveChanges() {

    if (!this.checkRequiredFields()) {
      this.data.color = this.color;
      this.netService.editCategory(this.data)
        .then( (msg) => {
          if (msg === 'No changes detected!') {
            this.snackBar.open(msg, null, { duration: 2000 });
          } else {
            this.dialogRef.close(true);
          }
        });
    }
  }

  public createCategory() {
    if (!this.checkRequiredFields()) {
      this.data.color = this.color;
      this.netService.createCategory(this.data)
        .then( msg => {
          this.dialogRef.close(true);
        })
    }

  }

  checkRequiredFields() {
    return this.data.hausa === '' || this.data.english === '';
  }

}
