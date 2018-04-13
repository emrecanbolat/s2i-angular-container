import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AlwaysAuthChildrenGuard} from '../../../shared/services/auth/AlwaysAuthChildrenGuard';
import {OnlyLoggedInUserGuard} from '../../../shared/services/auth/OnlyLoggedInUserGuard';
import {AlwaysAuthGuard} from '../../../shared/services/auth/AlwaysAuthGuard';
import {AdminMainComponent} from './admin-main/admin-main.component';
import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {AdminMediaComponent} from './admin-media/admin-media.component';

const adminRoutes: Routes = [
  { path: 'admin',
    component: AdminMainComponent,
    canActivate: [ OnlyLoggedInUserGuard, AlwaysAuthGuard ],
    canActivateChild: [ AlwaysAuthChildrenGuard ],
    children: [
      {path: 'overview', component: AdminHomeComponent},
      {path: 'categories', component: AdminCategoriesComponent},
      {path: 'media', component: AdminMediaComponent},
      {path: 'help', component: AdminHomeComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AlwaysAuthGuard, OnlyLoggedInUserGuard, AlwaysAuthChildrenGuard
  ]
})

export class AdminRoutingModule { }
