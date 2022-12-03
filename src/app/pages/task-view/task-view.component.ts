import { AuthService } from 'src/app/auth.service';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private webReqService: WebRequestService,
    private authService: AuthService
  ) {}
  selectedListId: string = '';

  isOwner: boolean = false;
  users: User[] = [];
  lists: List[] = [];
  userSelected: boolean = false;
  tasks: Task[] = [];
  ngOnInit(): void {
    this.isOwner = localStorage.getItem('isOwner') === 'true';
    // console.log('is Owner: ', this.isOwner);

    if (!this.isOwner) {
      let userId = localStorage.getItem('userId');
      if (userId) this.router.navigate(['/lists', userId]);
    }
    this.route.params.subscribe((params) => {
      console.log(params);

      this.taskService.getUsers().subscribe((users: any) => {
        this.users = users;

        console.log('users: ', this.users);
      });

      if (params['userId']) {
        this.userSelected = true;
        this.selectedListId = params['userId'];
        this.taskService.getTasks(params['userId']).subscribe((tasks: any) => {
          console.log(tasks);
          this.tasks = tasks;
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${id}`, { title });
  }
  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.userSelected = false;
      this.tasks = [];
      this.router.navigate(['/lists']);
      this.userSelected = false;
      this.selectedListId = '';
    });
  }
  onDeleteTaskClick(task: Task) {
    if (task.completed) {
      this.onTaskClick(task);
    }
    this.taskService.deleteTask(this.selectedListId, task._id).subscribe(() => {
      console.log('deleted  ');
      this.tasks = this.tasks.filter((val) => val._id !== task._id);
    });
  }

  onTaskClick(task: Task) {
    //mark
    this.taskService.complete(task).subscribe(() => {
      // console.log('completed');
      task.completed = !task.completed;
    });
  }
}
