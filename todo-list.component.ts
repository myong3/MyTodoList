import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { TodoStatusType } from './todo-status-type.enum';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  newTodoText = '';
  todoStatusType = TodoStatusType;
  list: Todo[] = [];
  status = TodoStatusType.All;
  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {}

  /**
   * 新增代辦事項
   */
  addTodo(): void {
    if (this.newTodoText.trim().length) {
      this.todoListService.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  /**
   * 取得待辦事項清單
   *
   */
  getList(): Todo[] {
    if (this.status === TodoStatusType.All) {
      this.list = this.todoListService.list;
      return this.todoListService.list;
    } else if (this.status === TodoStatusType.Active) {
      return this.getRemainingList();
    } else if (this.status === TodoStatusType.Completed) {
      return this.getCompletedList();
    }
  }

  remove(index: number): void {
    this.todoListService.remove(index);
  }

  /**
   * 開始編輯待辦事項
   *
   */
  edit(todo: Todo): void {
    todo.editMode = true;
  }

  /**
   * 更新待辦事項
   */
  update(todo: Todo, newTitle: string): void {
    console.log('todo', todo);

    if (!todo.editMode) {
      return;
    }

    const title = newTitle.trim();

    // 如果有輸入名稱則修改事項名稱
    if (title) {
      todo.setTitle(title);
      todo.editMode = false;

      // 如果沒有名稱則刪除該項待辦事項
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  /**
   * 取消編輯狀態
   */
  cancelEditing(todo: Todo): void {
    todo.editMode = false;
  }

  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }

  setStatus(status: number): void {
    this.status = status;
  }

  checkStatus(status: number): boolean {
    return this.status === status;
  }

  removeCompleted(): void {
    this.todoListService.removeCompleted();
  }

  /**
   * 取得所有的待辦事項清單（不受狀態影響）
   */
  getAllList(): Todo[] {
    return this.todoListService.list;
  }

  /**
   * 所有的代辦事項是否都已完成
   */
  allCompleted(): boolean {
    return this.getAllList().length === this.getCompletedList().length;
  }

  /**
   * 設定所有的待辦事項已完成/未完成
   */
  setAllTo(completed: boolean): void {
    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });
  }
}
