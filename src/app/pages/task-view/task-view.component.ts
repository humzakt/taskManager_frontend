import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  lists: List[] = [];
  tasks: Task[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.taskService.getLists().subscribe((lists: any) => {
        this.lists = lists;
      });
      if (params['listId']) {
        this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
          console.log(tasks);
          this.tasks = tasks;
        });
      }
    });
  }

  onTaskClick(task: Task) {
    //mark
    this.taskService.complete(task).subscribe(() => {
      console.log('completed');
      task.completed = !task.completed;
    });
  }
}
