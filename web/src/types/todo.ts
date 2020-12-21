export type TodoItem = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export type Todos = {
  todos: TodoItem[];
};

export type TodoInput = TodoItem;
