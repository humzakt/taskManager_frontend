import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  {
    path: 'new-list',
    component: NewListComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'lists/:listId',
    component: TaskViewComponent,
  },
  {
    path: 'lists',
    component: TaskViewComponent,
  },
  {
    path: 'lists/:listId/new-task',
    component: NewTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
