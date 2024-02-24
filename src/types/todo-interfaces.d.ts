export interface TodoItemInterface {
  id: string;
  todo: string;
  category: string;
  isCompleted: boolean;
}

export interface TodoInitialState {
  todos: TodoItemInterface[];
  categories: string[];
}
