import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  listId: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params['userId'];
      // console.log(this.listId);
    });
  }

  error: Boolean = false;
  createTask(title: string) {
    this.error = false;
    if (title.length > 0) {
      this.taskService
        .createTask(title, this.listId)
        .subscribe((response: any) => {
          console.log(response);

          this.router.navigate([`../`], { relativeTo: this.route });
        });
    } else {
      this.error = true;
    }
  }
}
