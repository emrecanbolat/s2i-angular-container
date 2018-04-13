import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from '@angular/animations';
import {CarouselItemDirective} from './carousel-item.directive';
import {CarouselItemElement} from './carousel-item.element';

import {Directive, TemplateRef} from '@angular/core';
import {MediaService} from '../services/media.service';
import {MatDialog} from '@angular/material';
import {EditCategoryComponent} from '../../content/components/admin/admin-edit/edit-category/edit-category.component';
import {ExistingMediasComponent} from '../../content/components/admin/admin-edit/existing-medias/existing-medias.component';

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  carouselWrapperStyle = {};
  wrapperStyle = {};

  @ViewChild('carousel') private carousel : ElementRef;
  @ViewChildren('moreInner') private moreInner;
  @ViewChild('moreInnerCol') private moreInnerCol : ElementRef;
  @ViewChildren('fileInput') private fileInputs;

  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  @Input() variableSize = false;
  @Input() withAnim = false;
  @Input() medias: any;

  private player : AnimationPlayer;
  private itemWidth: number;
  private itemHeight: number; columnHeight: string;
  currentSlide = 0;

  constructor( private builder: AnimationBuilder,
               private change: ChangeDetectorRef,
               private mediaService: MediaService,
               private dialog: MatDialog) {

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.changeCarouselSize();
      if (this.withAnim) {
        setInterval(() => this.moveTo(this.currentSlide + 1),3000);
      }
    }, 20);

    this.columnHeight = (this.moreInner.first.nativeElement.offsetWidth - 4) + 'px';

    this.change.detectChanges();
  }

  next() {
    if (this.currentSlide + 1 === this.items.length ) return;

    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    if (this.variableSize) this.changeCarouselSize();

    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.builder.build([
      animate(this.timing, style( {transform: `translateX(-${offset}px)`} ))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();

  }

  prev() {
    if ( this.currentSlide === 0 ) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    if (this.variableSize) this.changeCarouselSize();

    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private moveTo(item) {
    if (item === this.currentSlide) return;

    if (this.currentSlide === this.items.length-1 && this.withAnim) { item = 0; }

    const offset = this.calculateMoveWidth(item);
    this.currentSlide = item;
    if (this.variableSize) { this.changeCarouselSize(); }

    const myAnimation: AnimationFactory = this.builder.build([
      animate(this.timing, style( {transform: `translateX(${offset}px)`} ))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private calculateMoveWidth(to) {
    let moveWidth = 0;

    for (const {element, index} of this.itemsElements.toArray().map((element, index) => ({ element, index }))) {
      if ( index < to ) {
        moveWidth -= element.nativeElement.offsetWidth;
      }
    }

    return moveWidth;

  }

  changeCarouselSize() {
    if (this.itemsElements.toArray()[this.currentSlide]) {
      this.itemWidth = this.itemsElements.toArray()[this.currentSlide].nativeElement.offsetWidth;
      this.itemHeight = this.itemsElements.toArray()[this.currentSlide].nativeElement.offsetHeight;
      if (!this.medias) {
        this.itemHeight += 50}

      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`,
        height: `${this.itemHeight}px`,
      };

      let carouselWidth = 'auto';
      if (this.variableSize) {
        carouselWidth = '450px';
      }
      this.wrapperStyle = {
        width: carouselWidth
      }
    }
  }

  removeMedia(item) {
    console.log(item)
    this.mediaService.removeMedia(item)
  }

  openExistingImages() {
    let dialogRef = this.dialog.open(ExistingMediasComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mediaService.chooseMedia(result);
        this.changeCarouselSize();
      }
    });
  }

  openNewUpload($event) {
    this.read($event.target);

  }

  read(input) {
    let file: File = input.files[0];
    let reader: FileReader = new FileReader();

    reader.onload = e => {
      this.medias.push({file: reader.result });
    };

    reader.readAsDataURL(file);
  }

}
