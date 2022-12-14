import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'signup', component: SignupPageComponent },
  { path: 'create-sub-user', component: CreateUserComponent },
  { path: 'lists/:userId/edit-task/:taskId', component: EditTaskComponent },

  {
    path: 'new-list',
    component: NewListComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'lists/:userId',
    component: TaskViewComponent,
  },
  {
    path: 'lists',
    component: TaskViewComponent,
  },
  {
    path: 'lists/:userId/new-task',
    component: NewTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
