import {Component, OnInit, ViewChild} from '@angular/core';
import { NetService } from '../../../shared/services/net.service';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  categories: any;
  count: number;

  constructor(private network: NetService) { }

  ngOnInit() {

    this.network.getCategories(1).then( result => {
      this.categories = result.categories;
      this.count = result.count;
    });

  }

  loadPage() {
    this.network.getCategories(this.paginator.pageIndex + 1).then( result => {
      this.categories = Object.assign([], result.words);
    })
  }

}
