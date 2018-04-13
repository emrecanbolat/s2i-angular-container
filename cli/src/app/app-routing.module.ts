import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const app_routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(app_routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
