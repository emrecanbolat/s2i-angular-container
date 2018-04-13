import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {CategoryWordComponent} from './components/category-word/category-word.component';
import {LoginComponent} from './components/login/login.component';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';
import {AlwaysAuthGuard} from '../shared/services/auth/AlwaysAuthGuard';
import {OnlyLoggedInUserGuard} from '../shared/services/auth/OnlyLoggedInUserGuard';
import {UserService} from '../shared/services/auth/user.service';
import {AlwaysAuthChildrenGuard} from '../shared/services/auth/AlwaysAuthChildrenGuard';
import {SignupComponent} from './components/signup/signup.component';

const contentRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryWordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(contentRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserService, AlwaysAuthGuard, OnlyLoggedInUserGuard, AlwaysAuthChildrenGuard
  ]
})

export class ContentRoutingModule { }
