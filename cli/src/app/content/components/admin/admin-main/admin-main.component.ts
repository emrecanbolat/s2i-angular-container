import { Component, OnInit } from '@angular/core';
import {EditCategoryComponent} from '../admin-edit/edit-category/edit-category.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

}
