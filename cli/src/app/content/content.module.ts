import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../shared/shared.module';

import 'hammerjs';
import { NetService } from '../shared/services/net.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryWordComponent } from './components/category-word/category-word.component';
import { WordComponent } from './components/word/word.component';

import {
  MatPaginatorModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import {CarouselItemDirective} from '../shared/carousel/carousel-item.directive';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ContentRoutingModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [ ],
  declarations: [
    HomeComponent,
    CategoriesComponent,
    CategoryWordComponent,
    WordComponent,
    LoginComponent,
    SignupComponent
  ],
  entryComponents: [ WordComponent ],
  providers: [
    NetService
  ]
})

export class ContentModule { }
