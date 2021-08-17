export interface ITodoModel {
  _id: string,
  message: string,
  completed: boolean,
}

export interface ITodoProps {
  onToggle: (id: string, completed: boolean) => void,
  onEdit: (id: string, message: string) => void,
  onDelete: (id: string) => void,
}

export interface ITodoListProps extends ITodoProps {
  todos: ITodoModel[],
}

export interface ITodoItemProps extends ITodoProps {
  todo: ITodoModel,
}

export interface NewTodoFormProps {
  onAdd: (message: string) => void,
}
