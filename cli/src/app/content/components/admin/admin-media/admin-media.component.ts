import {Component, OnInit, ViewChild} from '@angular/core';
import {NetService} from '../../../../shared/services/net.service';
import {MatPaginator} from '@angular/material';
import {Media, Word} from '../../../../shared/model';

@Component({
  selector: 'app-admin-media',
  templateUrl: './admin-media.component.html',
  styleUrls: ['./admin-media.component.css']
})
export class AdminMediaComponent implements OnInit {

  medias: any;
  currentMedias: any;

  pageSize = 12;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private netService: NetService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.netService.getAdminMedias()
      .then( (res) => {

        this.medias = res.map( (e, idx, arr) => {

          return {
            id: e.id,
            flag: e.flag,
            media: e.media_url + '.' + e.media_type
          } as Media;
        });

        this.loadPage();
      });
  }

  loadPage() {
    let start = 0;
    if (this.paginator) { start = this.paginator.pageIndex * this.pageSize; }
    this.currentMedias = this.medias.slice( start, start + this.pageSize);
  }

  public setFlag(item) {
    this.netService.changeMediaFlag(item)
      .then( msg => {
        if (msg) this.loadData();
      });
  }
}
