import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {Category, Word} from '../../../../shared/model';
import {NetService} from '../../../../shared/services/net.service';
import {MatDialog, MatPaginator} from '@angular/material';
import {EditWordComponent} from '../admin-edit/edit-word/edit-word.component';
import {EditCategoryComponent} from '../admin-edit/edit-category/edit-category.component';
import {UtilitiesService} from '../../../../shared/services/utilities.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy, AfterViewChecked {

  categories: any;
  currentCategories: any;
  sub: any;

  pageSize = 12;
  minHeight: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('thumbnailrow') thumbnailrow: ElementRef;

  constructor(private netService: NetService,
              private ref: ChangeDetectorRef,
              private dialog: MatDialog,
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
    this.netService.getAdminCategories()
      .then( (res) => {

        this.categories = res.map( (e, idx, arr) => {

          return {
            id: e.id,
            flag: e.flag,
            hausa: e.cat_hausa,
            english: e.cat_english,
            media: e.media_url + '.' + e.media_type,
            color: e.color,
            media_id: e.media_id
          } as Category;
        });
        this.currentCategories = this.categories.slice( 0, this.pageSize);
      });
  }

  ngAfterViewChecked () {
    if (this.thumbnailrow && !this.minHeight) {
      let children = this.thumbnailrow.nativeElement.children;
      let height = 0;
      for (let item of children) {
        if (height < item.offsetHeight) {
          height = item.offsetHeight;
        }
      }
      this.minHeight = height + 'px';
      this.ref.detectChanges();
    }
  }

  openEditDialog(category) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '1000px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

}
