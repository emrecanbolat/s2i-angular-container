import {NgModule} from '@angular/core';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {SharedModule} from '../../../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatButtonModule,
  MatSnackBarModule, MatMenuModule
} from '@angular/material';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminMediaComponent } from './admin-media/admin-media.component';
import { EditWordComponent } from './admin-edit/edit-word/edit-word.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditCategoryComponent } from './admin-edit/edit-category/edit-category.component';
import { ExistingMediasComponent } from './admin-edit/existing-medias/existing-medias.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    ColorPickerModule,
    MatMenuModule
  ],
  exports: [ ],
  declarations: [
    AdminHomeComponent,
    AdminMainComponent,
    AdminCategoriesComponent,
    AdminMediaComponent,
    EditWordComponent,
    EditCategoryComponent,
    ExistingMediasComponent
  ],
  entryComponents: [ EditWordComponent, EditCategoryComponent, ExistingMediasComponent ],
  providers: [

  ]
})

export class AdminModule { }
