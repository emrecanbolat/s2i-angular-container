import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EditWordComponent} from '../../content/components/admin/admin-edit/edit-word/edit-word.component';
import {EditCategoryComponent} from '../../content/components/admin/admin-edit/edit-category/edit-category.component';
import {Router} from '@angular/router';
import {UtilitiesService} from '../services/utilities.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public router: Router,
              private utilities: UtilitiesService) { }

  ngOnInit() {
  }

  public addNewCategory() {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.utilities.executeAction();
      }
    });
  }

  public addNewWord() {
    let dialogRef = this.dialog.open(EditWordComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.utilities.executeAction();
      }
    });
  }
}
