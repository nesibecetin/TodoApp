import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TodoComponent } from './component/todo/todo.component';
import { CategoryComponent } from './component/category/category.component';

const routes: Routes = [
  {path:'',component:TodoComponent},
  {path:'category',component:CategoryComponent},
  {path:'todo',component:TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
