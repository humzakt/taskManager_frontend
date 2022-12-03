export interface Task {
  _id: string;
  _userId: string;
  title: string;
  completed: boolean;

  // constructor(title: string, _listId: string, _id: string) {
  //   this.title = title;

  //   this._id = _id;
  //   this._listId = _listId;
  //   this.completed = false;
  // }
}
