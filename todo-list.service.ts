import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  list: Todo[] = [];

  constructor() {}

  /**
   * 新增待辦事項
   */
  add(title: string): void {
    // 避免傳入的 title 是無效值或空白字串，稍微判斷一下
    if (title || title.trim()) {
      const todo = new Todo();
      todo.status = false;
      todo.todoName = title;
      this.list.push(todo);
    }
  }

  remove(index: number): void {
    this.list.splice(index, 1);
  }

  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter((todo) => todo.status === completed);
  }

  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }
}
