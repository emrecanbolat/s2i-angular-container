import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ContentModule } from './content/content.module';
import {AdminModule} from './content/components/admin/admin.module';
import {MediaService} from './shared/services/media.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ContentModule,
    AdminModule
  ],
  providers: [ MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
