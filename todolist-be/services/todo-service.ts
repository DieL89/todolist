import Todo from '../models/Todo';
import { IQueryOptions, ITodoModel, IPagedResult } from "../types/types";

export async function getTodoList(queryOptions: IQueryOptions) {
  const result = await Todo.find({}, {}, queryOptions);

  return getPagedResult(result, queryOptions);
}

export function getById(id: string) {
  return Todo.findById({ _id: id });
}

export function createTodo(todoModel: ITodoModel) {
  const todo = new Todo(todoModel);
  return todo.save();
}

export function patchTodo(id: string, todoModel: ITodoModel) {
  return Todo.updateOne({ _id: id }, todoModel);
}

export function deleteTodo(id: string) {
  return Todo.deleteOne({ _id: id });
}

export async function* getTodoListGenerator(queryOptions: IQueryOptions) {
  for await (const doc of Todo.find({}, {}, queryOptions)) {
    yield doc;
  }
}

export async function getTodoPagination(queryOptions: IQueryOptions): Promise<IPagedResult> {
  const totalCount = await Todo.countDocuments();

  if (!queryOptions) {
    return {
      page: 1,
      totalPages: 1,
      limit: totalCount,
    };
  }

  return {
    page: (queryOptions.skip / queryOptions.limit) + 1,
    totalPages: Math.ceil(totalCount / queryOptions.limit),
    limit: queryOptions.limit,
  };
}

async function getPagedResult(results: any[], queryOptions: IQueryOptions): Promise<IPagedResult> {
  const pagedResult = await getTodoPagination(queryOptions);

  pagedResult.data = results;

  return pagedResult;
}
