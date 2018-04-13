import {Component, OnInit, ViewChild} from '@angular/core';
import {NetService} from '../../../../../shared/services/net.service';
import {Media} from '../../../../../shared/model';
import {MatDialogRef, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-existing-medias',
  templateUrl: './existing-medias.component.html',
  styleUrls: ['./existing-medias.component.css']
})
export class ExistingMediasComponent implements OnInit {

  medias: any;
  currentMedias: any;

  pageSize = 9;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private netService: NetService,
              public dialogRef: MatDialogRef<ExistingMediasComponent>) { }

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

  selectMedia(item) {
    this.dialogRef.close({ file: item.media, id: item.id } );
  }

}
