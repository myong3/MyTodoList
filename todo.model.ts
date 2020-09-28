export class Todo {
  status: boolean;
  todoName: string;
  editMode = false;
  /**
   * 來回切換完成狀態
   */
  toggleCompletion(): void {
    this.status = !this.status;
  }

  setTitle(title: string): void {
    this.todoName = title;
  }

  /**
   * 取得事項名稱
   */
  getTitle(): string {
    return this.todoName;
  }

  setCompleted(completed: boolean): void {
    this.status = completed;
  }
}
