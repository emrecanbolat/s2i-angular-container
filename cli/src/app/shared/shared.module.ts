import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';

import { HeaderComponent } from './header/header.component';
import { HeadroomModule } from '@ctrl/ngx-headroom'
import { RouterModule } from '@angular/router';
import {CarouselComponent} from './carousel/carousel.component';
import {CarouselItemElement} from './carousel/carousel-item.element';
import {UtilitiesService} from './services/utilities.service';

import './extensions';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import {CarouselItemDirective} from './carousel/carousel-item.directive';
import {MatMenuModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HeadroomModule,
    MatMenuModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    HeaderComponent,
    CarouselComponent,
    AdminNavbarComponent,
    CarouselItemDirective,
    MatTooltipModule
  ],
  declarations: [
    NavbarComponent,
    HeaderComponent,
    CarouselItemElement,
    CarouselComponent,
    AdminNavbarComponent,
    CarouselItemDirective
  ],
  providers: [ UtilitiesService ]
})
export class SharedModule { }
