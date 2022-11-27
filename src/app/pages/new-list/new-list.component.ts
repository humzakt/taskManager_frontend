import { List } from 'src/app/models/list.model';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((data: any) => {
      console.log(data);

      // Navigate them to /lists/listponse._id

      this.router.navigate([`/lists/${data._id}`]);
    });
  }
}
